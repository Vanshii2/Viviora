/**
 * API integration tests against an in-memory MongoDB (never touches your real database).
 *   npm test -w server
 */
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

process.env.NODE_ENV = 'test';
process.env.CLIENT_URL = 'http://localhost:5173';

const { createApp } = await import('../src/app.js');
const { seedDatabase } = await import('../src/seed/seed.js');
const { ContactMessage } = await import('../src/models/ContactMessage.js');

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

describe('health', () => {
  test('reports connected database', async () => {
    const res = await request(app).get('/api/v1/health').expect(200);
    assert.equal(res.body.data.database, 'connected');
  });
});

describe('programs', () => {
  test('lists the 7 programs in order', async () => {
    const res = await request(app).get('/api/v1/programs').expect(200);
    assert.equal(res.body.success, true);
    assert.deepEqual(
      res.body.data.map((p) => p.slug),
      [
        'gut-health',
        'weight-loss',
        'muscle-building',
        'womens-health',
        'lifestyle-disorders',
        'kids-nutrition',
        'sports-nutrition',
      ],
    );
    assert.ok(!('_id' in res.body.data[0]), 'internal ids are not exposed');
  });

  test('featured=true returns exactly the 3 homepage programs', async () => {
    const res = await request(app).get('/api/v1/programs?featured=true').expect(200);
    assert.deepEqual(
      res.body.data.map((p) => p.slug),
      ['gut-health', 'weight-loss', 'muscle-building'],
    );
  });

  test('rejects an invalid featured value', async () => {
    const res = await request(app).get('/api/v1/programs?featured=maybe').expect(400);
    assert.equal(res.body.error.code, 'VALIDATION_ERROR');
  });

  test('returns a main program with options and FAQs', async () => {
    const res = await request(app).get('/api/v1/programs/gut-health').expect(200);
    const p = res.body.data;
    assert.equal(p.title, 'Gut Health');
    assert.equal(p.options.length, 6);
    assert.equal(p.parent, null);
    assert.equal(p.price, 2499);
    assert.equal(p.discountPercent, 29);
    assert.ok(p.faqs.every((f) => f.id && f.question && f.answer));
  });

  test('returns a focused option inheriting its parent', async () => {
    const res = await request(app).get('/api/v1/programs/ibs-support').expect(200);
    assert.equal(res.body.data.title, 'IBS Support');
    assert.deepEqual(res.body.data.parent, { slug: 'gut-health', title: 'Gut Health' });
    assert.equal(res.body.data.fallbackImage, '/images/programs/gut-health.jpg');
  });

  test('unknown slug → 404', async () => {
    const res = await request(app).get('/api/v1/programs/does-not-exist').expect(404);
    assert.equal(res.body.error.code, 'NOT_FOUND');
  });

  test('malformed slug → 400', async () => {
    await request(app).get('/api/v1/programs/%24where').expect(400);
  });
});

describe('blog', () => {
  test('lists posts newest first without bodies', async () => {
    const res = await request(app).get('/api/v1/blog/posts').expect(200);
    assert.equal(res.body.data.length, 4);
    assert.ok(!('body' in res.body.data[0]));
    const dates = res.body.data.map((p) => p.publishedAt);
    assert.deepEqual(dates, [...dates].sort().reverse());
  });

  test('filters by category', async () => {
    const res = await request(app).get('/api/v1/blog/posts?category=gut-health').expect(200);
    assert.ok(res.body.data.length > 0);
    assert.ok(res.body.data.every((p) => p.category.slug === 'gut-health'));
  });

  test('lists categories', async () => {
    const res = await request(app).get('/api/v1/blog/categories').expect(200);
    assert.equal(res.body.data.length, 4);
  });

  test('returns a post with structured body blocks', async () => {
    const res = await request(app).get('/api/v1/blog/posts/building-a-balanced-plate').expect(200);
    assert.ok(res.body.data.body.every((b) => ['p', 'h2', 'ul'].includes(b.type)));
  });

  test('unknown post → 404', async () => {
    await request(app).get('/api/v1/blog/posts/nope').expect(404);
  });
});

describe('faqs', () => {
  test('returns the 5 homepage FAQs in order', async () => {
    const res = await request(app).get('/api/v1/faqs').expect(200);
    assert.equal(res.body.data.length, 5);
    assert.equal(res.body.data[0].question, 'What is Viviora?');
  });
});

describe('contact', () => {
  const valid = {
    name: 'Test User',
    email: 'Test@Example.com',
    subject: 'Hello',
    message: 'I would like to know more.',
  };

  test('stores a valid message (email normalised)', async () => {
    const res = await request(app).post('/api/v1/contact').send(valid).expect(201);
    assert.equal(res.body.data.received, true);
    const saved = await ContactMessage.findById(res.body.data.id).lean();
    assert.equal(saved.email, 'test@example.com');
    assert.equal(saved.status, 'new');
  });

  test('rejects invalid fields with per-field details', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({ ...valid, email: 'nope', message: 'short' })
      .expect(400);
    assert.ok(res.body.error.details.email);
    assert.ok(res.body.error.details.message);
  });

  test('rejects malformed JSON', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Content-Type', 'application/json')
      .send('{"name":')
      .expect(400);
    assert.equal(res.body.error.code, 'INVALID_JSON');
  });

  test('honeypot submissions are accepted but not stored', async () => {
    const before = await ContactMessage.countDocuments();
    await request(app)
      .post('/api/v1/contact')
      .send({ ...valid, website: 'spam.example' })
      .expect(201);
    assert.equal(await ContactMessage.countDocuments(), before);
  });

  test('rate limits a client after 5 submissions per window', async () => {
    const statuses = [];
    for (let i = 0; i < 6; i += 1) {
      statuses.push((await request(app).post('/api/v1/contact').send(valid)).status);
    }
    const firstLimited = statuses.indexOf(429);
    assert.ok(firstLimited !== -1, `expected a 429, got ${statuses}`);
    // Earlier tests already used part of this client's quota; total allowed must be exactly 5.
    const usedBefore = 3; // valid + invalid + honeypot submissions above
    assert.equal(usedBefore + firstLimited, 5);
  });
});

describe('database unavailable', () => {
  test('content routes return 503 instead of hanging', async () => {
    await mongoose.disconnect();
    const res = await request(app).get('/api/v1/programs').expect(503);
    assert.equal(res.body.error.code, 'DATABASE_UNAVAILABLE');
    await mongoose.connect(mongo.getUri());
  });
});
