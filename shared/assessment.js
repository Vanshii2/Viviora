/**
 * Nutrition assessment — answer options and program rules shared by the client form and the
 * server validation, so both always agree. Pure data/functions, no dependencies.
 * Each option: { value (stored), label (shown) }.
 */

const o = (value, label) => ({ value, label });

export const GENDERS = [
  o('female', 'Female'),
  o('male', 'Male'),
  o('non_binary', 'Non-binary'),
  o('prefer_not_say', 'Prefer not to say'),
];

export const GUARDIAN_RELATIONS = [
  o('parent', 'Parent'),
  o('guardian', 'Legal guardian'),
  o('other', 'Other family member'),
];

export const WEIGHT_CHANGES = [
  o('none', 'No significant change'),
  o('gained', 'I have gained weight'),
  o('lost', 'I have lost weight'),
  o('fluctuating', 'My weight fluctuates'),
];

/** 'none' and 'prefer_not_say' are exclusive with every other choice. */
export const CONDITIONS = [
  o('none', 'No known medical conditions'),
  o('pcos', 'PCOS / PCOD'),
  o('thyroid', 'Thyroid condition'),
  o('diabetes', 'Diabetes'),
  o('high_bp', 'High blood pressure'),
  o('digestive', 'Digestive issues'),
  o('heart', 'Heart condition'),
  o('kidney', 'Kidney condition'),
  o('liver', 'Liver condition'),
  o('other', 'Other'),
  o('prefer_not_say', 'Prefer not to say'),
];
export const EXCLUSIVE_CONDITIONS = ['none', 'prefer_not_say'];

export const YES_NO_UNSURE = [o('yes', 'Yes'), o('no', 'No'), o('not_sure', 'Not sure')];
export const CYCLE_REGULARITY = [
  o('regular', 'Regular'),
  o('irregular', 'Irregular'),
  o('not_sure', 'Not sure'),
  o('not_applicable', 'Not applicable'),
];
export const DIABETES_TYPES = [
  o('type1', 'Type 1'),
  o('type2', 'Type 2'),
  o('prediabetes', 'Prediabetes'),
  o('gestational', 'Gestational'),
  o('not_sure', 'Not sure'),
];
export const THYROID_TYPES = [
  o('hypo', 'Hypothyroidism'),
  o('hyper', 'Hyperthyroidism'),
  o('other', 'Other'),
  o('not_sure', 'Not sure'),
];
export const DIGESTIVE_SYMPTOMS = [
  o('bloating', 'Bloating'),
  o('constipation', 'Constipation'),
  o('acidity', 'Acidity'),
  o('discomfort', 'Frequent discomfort'),
  o('other', 'Other'),
];
export const SYMPTOM_FREQUENCY = [
  o('rarely', 'Rarely'),
  o('weekly', 'A few times a week'),
  o('daily', 'Most days'),
];

export const DIETARY_PREFERENCES = [
  o('vegetarian', 'Vegetarian'),
  o('vegan', 'Vegan'),
  o('eggetarian', 'Eggetarian'),
  o('non_vegetarian', 'Non-vegetarian'),
  o('other', 'Other'),
];
export const MEALS_PER_DAY = [o('1-2', '1–2'), o('3', '3'), o('4-5', '4–5'), o('6+', '6 or more')];
export const WATER_INTAKE = [
  o('lt1', 'Less than 1 litre'),
  o('1-2', '1–2 litres'),
  o('2-3', '2–3 litres'),
  o('gt3', 'More than 3 litres'),
];
export const BREAKFAST_HABITS = [
  o('daily', 'Every day'),
  o('sometimes', 'Sometimes'),
  o('rarely', 'Rarely or never'),
];
export const FREQUENCY = [
  o('rarely', 'Rarely'),
  o('weekly', '1–2 times a week'),
  o('often', '3–5 times a week'),
  o('daily', 'Daily'),
];
export const CAFFEINE = [
  o('none', 'None'),
  o('1', '1 cup a day'),
  o('2-3', '2–3 cups a day'),
  o('4+', '4 or more cups a day'),
];

export const ACTIVITY_LEVELS = [
  o('sedentary', 'Sedentary'),
  o('light', 'Lightly active'),
  o('moderate', 'Moderately active'),
  o('very', 'Very active'),
];
export const EXERCISE_FREQUENCY = [
  o('none', 'Not currently'),
  o('1-2', '1–2 days a week'),
  o('3-4', '3–4 days a week'),
  o('5+', '5 or more days a week'),
];
export const SLEEP_DURATION = [
  o('lt5', 'Less than 5 hours'),
  o('5-6', '5–6 hours'),
  o('7-8', '7–8 hours'),
  o('gt8', 'More than 8 hours'),
];
export const SLEEP_QUALITY = [o('good', 'Good'), o('average', 'Average'), o('poor', 'Poor')];
export const STRESS_LEVELS = [
  o('low', 'Low'),
  o('moderate', 'Moderate'),
  o('high', 'High'),
  o('prefer_not_say', 'Prefer not to say'),
];
export const WORK_ROUTINES = [
  o('desk', 'Mostly desk-based'),
  o('mixed', 'Mix of sitting and moving'),
  o('active', 'Physically active work'),
  o('shift', 'Shift work / irregular hours'),
  o('home', 'Home-maker / caregiver'),
  o('student', 'Student'),
  o('other', 'Other'),
];
export const TRAINING_INTENSITY = [o('low', 'Low'), o('moderate', 'Moderate'), o('high', 'High')];

export const GOALS = [
  o('weight_loss', 'Weight loss'),
  o('weight_gain', 'Weight gain'),
  o('muscle_building', 'Muscle building'),
  o('gut_health', 'Gut health'),
  o('pcos_management', 'PCOS management'),
  o('womens_health', "Women's health"),
  o('diabetes_management', 'Diabetes management'),
  o('thyroid_support', 'Thyroid support'),
  o('lifestyle_condition', 'Lifestyle condition support'),
  o('kids_growth', "Child's healthy growth"),
  o('sports_nutrition', 'Sports nutrition'),
  o('general_fitness', 'General fitness'),
  o('healthy_lifestyle', 'Healthy lifestyle'),
  o('other', 'Other'),
];
export const TIMELINES = [
  o('1-3m', '1–3 months'),
  o('3-6m', '3–6 months'),
  o('6-12m', '6–12 months'),
  o('flexible', 'No fixed timeline'),
];

export const values = (options) => options.map((opt) => opt.value);
export const labelOf = (options, value) =>
  options.find((opt) => opt.value === value)?.label ?? value;

/** Sensible input limits (also enforced on the server). */
export const LIMITS = {
  age: { min: 1, max: 120 },
  childAge: { min: 1, max: 17 },
  weightKg: { min: 2, max: 350 },
  heightCm: { min: 40, max: 250 },
  waistCm: { min: 20, max: 250 },
};

/** BMI = kg / m², one decimal. Returns null for missing or out-of-range input. */
export function calculateBmi(weightKg, heightCm) {
  const w = Number(weightKg);
  const h = Number(heightCm);
  if (!Number.isFinite(w) || !Number.isFinite(h)) return null;
  if (w < LIMITS.weightKg.min || w > LIMITS.weightKg.max) return null;
  if (h < LIMITS.heightCm.min || h > LIMITS.heightCm.max) return null;
  const m = h / 100;
  return Math.round((w / (m * m)) * 10) / 10;
}

/**
 * Which program-specific questions to show. `slug` is the selected program or focused option,
 * `parentSlug` its main program (same as slug for main programs).
 */
export function getProgramTrack(slug = '', parentSlug = slug) {
  const main = parentSlug || slug;
  return {
    isKids: main === 'kids-nutrition',
    weightLoss: main === 'weight-loss',
    gut: main === 'gut-health',
    pcos: main === 'womens-health' || slug.includes('pcos'),
    muscle: main === 'muscle-building',
    sports: main === 'sports-nutrition' || slug === 'kids-sports-nutrition',
    lifestyleDisorders: main === 'lifestyle-disorders',
  };
}

const GOALS_BY_PROGRAM = {
  'weight-loss': ['weight_loss'],
  'gut-health': ['gut_health'],
  'muscle-building': ['muscle_building'],
  'womens-health': ['womens_health'],
  'lifestyle-disorders': ['lifestyle_condition'],
  'kids-nutrition': ['kids_growth'],
  'sports-nutrition': ['sports_nutrition'],
};
const GOALS_BY_OPTION = {
  'pcos-weight-loss': ['weight_loss', 'pcos_management'],
  pcos: ['pcos_management'],
  thyroid: ['thyroid_support'],
  'diabetes-nutrition': ['diabetes_management'],
  'kids-sports-nutrition': ['kids_growth', 'sports_nutrition'],
};

/** Goals pre-selected for a program (the user can add more). */
export function goalsForProgram(slug = '', parentSlug = slug) {
  return GOALS_BY_OPTION[slug] ?? GOALS_BY_PROGRAM[parentSlug || slug] ?? [];
}
