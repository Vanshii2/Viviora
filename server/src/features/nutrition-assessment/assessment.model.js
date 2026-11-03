import mongoose from 'mongoose';
import * as A from '../../../../shared/assessment.js';

/**
 * Nutrition assessment. Contains SENSITIVE HEALTH DATA:
 * no public read API; access will be limited to the client and their assigned dietitian/admins.
 */
const opt = (options) => ({ type: String, enum: A.values(options) });
const text = { type: String, trim: true };
const sub = (definition) => new mongoose.Schema(definition, { _id: false });

const assessmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // set once authentication exists
    program: sub({ slug: { ...text, required: true }, title: text, parentSlug: text }),
    isForChild: { type: Boolean, default: false },

    personal: sub({
      fullName: { ...text, required: true },
      age: Number,
      gender: opt(A.GENDERS),
      relationship: opt(A.GUARDIAN_RELATIONS),
      email: { ...text, lowercase: true, required: true },
      phone: { ...text, required: true },
      city: text,
      occupation: text,
    }),
    child: sub({ nameOrInitials: text, age: Number, gender: opt(A.GENDERS) }),

    measurements: sub({
      weightKg: { type: Number, required: true },
      heightCm: { type: Number, required: true },
      bmi: Number, // calculated on the server
      targetWeightKg: Number,
      waistCm: Number,
      previousWeightKg: Number,
      recentWeightChange: opt(A.WEIGHT_CHANGES),
    }),

    health: sub({
      conditions: [opt(A.CONDITIONS)],
      otherCondition: text,
      medications: text,
      supplements: text,
      allergies: text,
      intolerances: text,
      surgeries: text,
      familyHistory: text,
      currentTreatment: text,
      lifestyleChallenges: text,
      additionalInfo: text,
      hasReport: Boolean,
      pcos: sub({
        diagnosed: opt(A.YES_NO_UNSURE),
        cycleRegularity: opt(A.CYCLE_REGULARITY),
        symptoms: text,
      }),
      diabetes: sub({ type: opt(A.DIABETES_TYPES), treatment: text, bloodSugar: text }),
      thyroid: sub({ type: opt(A.THYROID_TYPES), treatment: text }),
      digestive: sub({
        symptoms: [opt(A.DIGESTIVE_SYMPTOMS)],
        other: text,
        frequency: opt(A.SYMPTOM_FREQUENCY),
      }),
    }),

    nutrition: sub({
      dietaryPreference: { ...opt(A.DIETARY_PREFERENCES), required: true },
      dietaryPreferenceOther: text,
      foodsAvoided: text,
      favoriteFoods: text,
      mealsPerDay: opt(A.MEALS_PER_DAY),
      waterIntake: opt(A.WATER_INTAKE),
      breakfast: opt(A.BREAKFAST_HABITS),
      eatingOut: opt(A.FREQUENCY),
      junkFood: opt(A.FREQUENCY),
      sugar: opt(A.FREQUENCY),
      caffeine: opt(A.CAFFEINE),
      typicalDay: text,
    }),

    lifestyle: sub({
      activityLevel: opt(A.ACTIVITY_LEVELS),
      exerciseType: text,
      exerciseFrequency: opt(A.EXERCISE_FREQUENCY),
      sleepDuration: opt(A.SLEEP_DURATION),
      sleepQuality: opt(A.SLEEP_QUALITY),
      stressLevel: opt(A.STRESS_LEVELS),
      workRoutine: opt(A.WORK_ROUTINES),
      trainingRoutine: text,
      muscleGoals: text,
      sport: text,
      trainingIntensity: opt(A.TRAINING_INTENSITY),
      performanceGoals: text,
    }),

    goals: sub({
      goals: [opt(A.GOALS)],
      otherGoal: text,
      timeline: opt(A.TIMELINES),
      biggestConcern: text,
      previousDiets: text,
      weightLossAttempts: text,
      challenges: text,
      expectations: text,
      anythingElse: text,
    }),

    consentAt: { type: Date, required: true },
    status: { type: String, enum: ['submitted', 'in_review', 'reviewed'], default: 'submitted' },
  },
  { timestamps: true },
);

assessmentSchema.index({ status: 1, createdAt: -1 });
assessmentSchema.index({ 'program.slug': 1, createdAt: -1 });
assessmentSchema.index({ user: 1, createdAt: -1 });

export const Assessment = mongoose.model('Assessment', assessmentSchema);
