import { z } from 'zod';
import * as A from '../../../../shared/assessment.js';

// ---- helpers: empty strings from the form mean "not answered" -------------------------------
const blankToUndefined = (v) => (v === '' || v === null ? undefined : v);
const optText = (max = 500) =>
  z.preprocess(
    blankToUndefined,
    z.string().trim().max(max, `Please keep this under ${max} characters.`).optional(),
  );
const reqText = (max, message) =>
  z
    .string({ error: message })
    .trim()
    .min(1, message)
    .max(max, `Please keep this under ${max} characters.`);
const optEnum = (options) => z.preprocess(blankToUndefined, z.enum(A.values(options)).optional());
const optNumber = ({ min, max }, label) =>
  z.preprocess(
    (v) => (blankToUndefined(v) === undefined ? undefined : Number(v)),
    z
      .number()
      .min(min, `${label} must be at least ${min}.`)
      .max(max, `${label} must be ${max} or less.`)
      .optional(),
  );
const reqNumber = ({ min, max }, message) =>
  z.preprocess(
    (v) => (blankToUndefined(v) === undefined ? undefined : Number(v)),
    z.number({ error: message }).min(min, message).max(max, message),
  );
const enumList = (options) =>
  z
    .array(z.enum(A.values(options)))
    .max(options.length)
    .default([]);

const phone = z
  .string({ error: 'Please enter your phone number.' })
  .trim()
  .regex(/^\+?[0-9][0-9\s-]{8,16}[0-9]$/, 'Please enter a valid phone number.');
const email = z
  .string({ error: 'Please enter your email address.' })
  .trim()
  .toLowerCase()
  .email('Please enter a valid email address.')
  .max(254);

// ---- sections --------------------------------------------------------------------------------
const personal = z.object({
  fullName: reqText(80, 'Please enter your full name.'),
  age: optNumber(A.LIMITS.age, 'Age'), // required for adults — enforced in the service (needs the program)
  gender: optEnum(A.GENDERS),
  relationship: optEnum(A.GUARDIAN_RELATIONS), // kids: parent/guardian completing the form
  email,
  phone,
  city: optText(80),
  occupation: optText(80),
});

const child = z.object({
  nameOrInitials: reqText(60, "Please enter the child's name or initials."),
  age: reqNumber(A.LIMITS.childAge, "Please enter the child's age (1–17)."),
  gender: optEnum(A.GENDERS),
});

const measurements = z.object({
  weightKg: reqNumber(A.LIMITS.weightKg, 'Please enter a valid current weight.'),
  heightCm: reqNumber(A.LIMITS.heightCm, 'Please enter a valid height.'),
  targetWeightKg: optNumber(A.LIMITS.weightKg, 'Target weight'),
  waistCm: optNumber(A.LIMITS.waistCm, 'Waist'),
  previousWeightKg: optNumber(A.LIMITS.weightKg, 'Previous weight'),
  recentWeightChange: optEnum(A.WEIGHT_CHANGES),
});

const health = z
  .object({
    conditions: z
      .array(z.enum(A.values(A.CONDITIONS)))
      .min(1, 'Please tell us about any medical conditions.'),
    otherCondition: optText(200),
    medications: optText(),
    supplements: optText(),
    allergies: optText(),
    intolerances: optText(),
    surgeries: optText(),
    familyHistory: optText(),
    currentTreatment: optText(),
    lifestyleChallenges: optText(),
    additionalInfo: optText(1000),
    hasReport: z.boolean().optional(),
    pcos: z
      .object({
        diagnosed: optEnum(A.YES_NO_UNSURE),
        cycleRegularity: optEnum(A.CYCLE_REGULARITY),
        symptoms: optText(),
      })
      .optional(),
    diabetes: z
      .object({ type: optEnum(A.DIABETES_TYPES), treatment: optText(), bloodSugar: optText(200) })
      .optional(),
    thyroid: z.object({ type: optEnum(A.THYROID_TYPES), treatment: optText() }).optional(),
    digestive: z
      .object({
        symptoms: enumList(A.DIGESTIVE_SYMPTOMS),
        other: optText(200),
        frequency: optEnum(A.SYMPTOM_FREQUENCY),
      })
      .optional(),
  })
  .superRefine((h, ctx) => {
    if (h.conditions.length > 1 && h.conditions.some((v) => A.EXCLUSIVE_CONDITIONS.includes(v))) {
      ctx.addIssue({
        code: 'custom',
        path: ['conditions'],
        message:
          '"No known conditions" or "Prefer not to say" cannot be combined with other conditions.',
      });
    }
  });

const nutrition = z.object({
  dietaryPreference: z.enum(A.values(A.DIETARY_PREFERENCES), {
    error: 'Please select your dietary preference.',
  }),
  dietaryPreferenceOther: optText(120),
  foodsAvoided: optText(),
  favoriteFoods: optText(),
  mealsPerDay: optEnum(A.MEALS_PER_DAY),
  waterIntake: optEnum(A.WATER_INTAKE),
  breakfast: optEnum(A.BREAKFAST_HABITS),
  eatingOut: optEnum(A.FREQUENCY),
  junkFood: optEnum(A.FREQUENCY),
  sugar: optEnum(A.FREQUENCY),
  caffeine: optEnum(A.CAFFEINE),
  typicalDay: optText(1000),
});

const lifestyle = z.object({
  activityLevel: optEnum(A.ACTIVITY_LEVELS),
  exerciseType: optText(200),
  exerciseFrequency: optEnum(A.EXERCISE_FREQUENCY),
  sleepDuration: optEnum(A.SLEEP_DURATION),
  sleepQuality: optEnum(A.SLEEP_QUALITY),
  stressLevel: optEnum(A.STRESS_LEVELS),
  workRoutine: optEnum(A.WORK_ROUTINES),
  trainingRoutine: optText(),
  muscleGoals: optText(),
  sport: optText(120),
  trainingIntensity: optEnum(A.TRAINING_INTENSITY),
  performanceGoals: optText(),
});

const goals = z.object({
  goals: z.array(z.enum(A.values(A.GOALS))).min(1, 'Please choose at least one goal.'),
  otherGoal: optText(200),
  timeline: optEnum(A.TIMELINES),
  biggestConcern: optText(),
  previousDiets: optText(),
  weightLossAttempts: optText(),
  challenges: optText(),
  expectations: optText(),
  anythingElse: optText(1000),
});

export const submitAssessmentBody = z.object({
  program: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]{1,80}$/, 'Please choose a program.'),
  personal,
  child: child.optional(),
  measurements,
  health,
  nutrition,
  lifestyle: lifestyle.default({}),
  goals,
  consent: z.literal(true, { error: 'Please confirm your consent to continue.' }),
});
