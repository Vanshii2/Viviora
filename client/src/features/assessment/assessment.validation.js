import { EXCLUSIVE_CONDITIONS, LIMITS } from '@shared/assessment.js';

/**
 * Client-side validation for REQUIRED questions only (the server validates everything again).
 * Returns { 'path.to.field': 'Friendly message' } for the given step.
 */
const blank = (v) => v === undefined || v === null || String(v).trim() === '';
const inRange = (v, { min, max }) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= min && n <= max;
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s-]{8,16}[0-9]$/;

function optionalNumber(errors, path, value, limits, label) {
  if (!blank(value) && !inRange(value, limits)) {
    errors[path] = `${label} should be between ${limits.min} and ${limits.max}.`;
  }
}

const validators = {
  basic(v, { isKids, needsProgram }) {
    const e = {};
    if (needsProgram && blank(v.program))
      e.program = 'Please choose the program you’re interested in.';
    if (blank(v.personal.fullName))
      e['personal.fullName'] = isKids
        ? 'Please enter your full name (parent or guardian).'
        : 'Please enter your full name.';
    if (isKids) {
      if (blank(v.child.nameOrInitials))
        e['child.nameOrInitials'] = "Please enter the child's name or initials.";
      if (!inRange(v.child.age, LIMITS.childAge))
        e['child.age'] = "Please enter the child's age (1–17).";
    } else if (!inRange(v.personal.age, LIMITS.age)) {
      e['personal.age'] = 'Please enter a valid age.';
    }
    if (blank(v.personal.email)) e['personal.email'] = 'Please enter your email address.';
    else if (!EMAIL.test(v.personal.email.trim()))
      e['personal.email'] = 'Please enter a valid email address.';
    if (blank(v.personal.phone)) e['personal.phone'] = 'Please enter your phone number.';
    else if (!PHONE.test(v.personal.phone.trim()))
      e['personal.phone'] = 'Please enter a valid phone number.';
    return e;
  },
  measurements(v) {
    const e = {};
    const m = v.measurements;
    if (blank(m.weightKg)) e['measurements.weightKg'] = 'Please enter your current weight.';
    else if (!inRange(m.weightKg, LIMITS.weightKg))
      e['measurements.weightKg'] =
        `Please enter a valid weight (${LIMITS.weightKg.min}–${LIMITS.weightKg.max} kg).`;
    if (blank(m.heightCm)) e['measurements.heightCm'] = 'Please enter your height.';
    else if (!inRange(m.heightCm, LIMITS.heightCm))
      e['measurements.heightCm'] =
        `Please enter a valid height (${LIMITS.heightCm.min}–${LIMITS.heightCm.max} cm).`;
    optionalNumber(
      e,
      'measurements.targetWeightKg',
      m.targetWeightKg,
      LIMITS.weightKg,
      'Target weight',
    );
    optionalNumber(e, 'measurements.waistCm', m.waistCm, LIMITS.waistCm, 'Waist');
    optionalNumber(
      e,
      'measurements.previousWeightKg',
      m.previousWeightKg,
      LIMITS.weightKg,
      'Previous weight',
    );
    return e;
  },
  health(v) {
    const e = {};
    const c = v.health.conditions;
    if (!c.length)
      e['health.conditions'] =
        'Please choose an option — “No known medical conditions” and “Prefer not to say” are fine.';
    else if (c.length > 1 && c.some((x) => EXCLUSIVE_CONDITIONS.includes(x)))
      e['health.conditions'] = 'Please don’t combine this option with other conditions.';
    return e;
  },
  nutrition(v) {
    return blank(v.nutrition.dietaryPreference)
      ? { 'nutrition.dietaryPreference': 'Please select your dietary preference.' }
      : {};
  },
  lifestyle() {
    return {};
  },
  goals(v) {
    return v.goals.goals.length ? {} : { 'goals.goals': 'Please choose at least one goal.' };
  },
  review(v) {
    return v.consent ? {} : { consent: 'Please confirm your consent to submit the assessment.' };
  },
};

export const validateStep = (stepId, values, ctx) => validators[stepId](values, ctx);
