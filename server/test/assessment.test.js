/**
 * Nutrition assessment API tests (in-memory MongoDB).
 */
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

process.env.NODE_ENV = 'test';

const { createApp } = await import('../src/app.js');
const { seedDatabase } = await import('../src/seed/seed.js');
const { Assessment } = await import('../src/features/nutrition-assessment/assessment.model.js');

let mongo;
let app;
before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await seedDatabase();
  app = createApp();
});
after(async () => {
  await mongoose.disconnect();
  await mongo?.stop();
});

const adult = () => ({
  program: 'weight-loss',
  personal: {
    fullName: 'Asha Rao',
    age: '32',
    gender: '',
    email: 'ASHA@example.com',
    phone: '+91 98765 43210',
    city: '',
    occupation: '',
  },
  measurements: {
    weightKg: '55',
    heightCm: '165',
    targetWeightKg: '',
    waistCm: '',
    previousWeightKg: '',
    recentWeightChange: '',
  },
  health: {
    conditions: ['pcos'],
    medications: '',
    pcos: { diagnosed: 'yes', cycleRegularity: '', symptoms: '' },
  },
  nutrition: { dietaryPreference: 'vegetarian', mealsPerDay: '3', caffeine: '' },
  lifestyle: { activityLevel: '', sleepDuration: '7-8' },
  goals: { goals: ['weight_loss', 'pcos_management'], timeline: '' },
  consent: true,
});

// The submit limiter counts only successful submissions (≤ 5/hour per IP); this file makes 3.
describe('POST /api/v1/assessments', () => {
  test('stores a valid adult assessment; BMI calculated on the server; blanks dropped', async () => {
    const body = adult();
    body.measurements.bmi = 99; // client-supplied BMI is ignored
    const res = await request(app).post('/api/v1/assessments').send(body).expect(201);
    assert.equal(res.body.data.status, 'submitted');
    assert.deepEqual(res.body.data.program, { slug: 'weight-loss', title: 'Weight Loss' });
    assert.equal(res.body.data.bmi, 20.2); // 55 / 1.65²

    const saved = await Assessment.findById(res.body.data.id).lean();
    assert.equal(saved.personal.email, 'asha@example.com');
    assert.equal(saved.personal.age, 32);
    assert.equal(saved.measurements.bmi, 20.2);
    assert.equal(saved.personal.city, undefined, 'empty optional answers are not stored');
    assert.equal(saved.isForChild, false);
    assert.ok(saved.consentAt instanceof Date);
    assert.equal(saved.consent, undefined);
  });

  test('reports every missing required field with a friendly message', async () => {
    const res = await request(app)
      .post('/api/v1/assessments')
      .send({
        program: 'weight-loss',
        personal: {},
        measurements: {},
        health: { conditions: [] },
        nutrition: {},
        goals: { goals: [] },
      })
      .expect(400);
    const d = res.body.error.details;
    for (const key of ['personal', 'measurements', 'health', 'nutrition', 'goals', 'consent'])
      assert.ok(d[key], `missing ${key}`);
  });

  test('kids program requires child details and a guardian, not the adult age', async () => {
    const body = adult();
    body.program = 'kids-nutrition';
    body.personal.age = '';
    body.personal.relationship = 'parent';
    const missing = await request(app).post('/api/v1/assessments').send(body).expect(400);
    assert.ok(missing.body.error.details.child);

    const option = await request(app)
      .post('/api/v1/assessments')
      .send({ ...body, program: 'healthy-growth' })
      .expect(400);
    assert.ok(option.body.error.details.child, 'focused kids programs also need child details');

    body.child = { nameOrInitials: 'A.R.', age: '9', gender: '' };
    body.measurements = { weightKg: '28', heightCm: '132' };
    const ok = await request(app).post('/api/v1/assessments').send(body).expect(201);
    const saved = await Assessment.findById(ok.body.data.id).lean();
    assert.equal(saved.isForChild, true);
    assert.equal(saved.child.age, 9);
    assert.equal(saved.personal.relationship, 'parent');
  });

  test('accepts a focused program option and rejects unknown programs, bad enums and exclusive-condition mixes', async () => {
    const opt = adult();
    opt.program = 'ibs-support';
    const ok = await request(app).post('/api/v1/assessments').send(opt).expect(201);
    assert.equal(ok.body.data.program.title, 'IBS Support');

    const bad = adult();
    bad.program = 'not-a-program';
    bad.nutrition.dietaryPreference = 'carnivore';
    bad.health.conditions = ['none', 'diabetes'];
    bad.measurements.heightCm = '0';
    const res = await request(app).post('/api/v1/assessments').send(bad).expect(400);
    const d = res.body.error.details;
    assert.ok(d.nutrition && d.health && d.measurements);
  });

  test('there is no public way to read assessments', async () => {
    await request(app).get('/api/v1/assessments').expect(404);
  });
});

describe('program pricing', () => {
  test('cards include price, regular price and discount', async () => {
    const res = await request(app).get('/api/v1/programs').expect(200);
    for (const p of res.body.data) {
      assert.ok(p.price > 0 && p.price < 3000, `${p.slug} price under ₹3000`);
      assert.ok(p.compareAtPrice > p.price);
      assert.equal(
        p.discountPercent,
        Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100),
      );
    }
  });
});
