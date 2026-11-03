import { relevance } from './assessment.config';

/** Builds the API payload: only relevant sections, numbers as numbers, file never sent. */
export function toPayload(values, { track, hasReport }) {
  const r = relevance(values, track);
  const health = { ...values.health, hasReport };
  if (!r.pcos) delete health.pcos;
  if (!r.diabetes) delete health.diabetes;
  if (!r.thyroid) delete health.thyroid;
  if (!r.digestive) delete health.digestive;
  if (!r.otherCondition) health.otherCondition = '';
  if (!track.lifestyleDisorders) {
    health.currentTreatment = '';
    health.lifestyleChallenges = '';
  }

  const nutrition = { ...values.nutrition };
  if (!r.dietOther) nutrition.dietaryPreferenceOther = '';

  const goals = { ...values.goals };
  if (!r.otherGoal) goals.otherGoal = '';
  if (!track.weightLoss) goals.weightLossAttempts = '';

  const lifestyle = { ...values.lifestyle };
  if (!track.muscle) Object.assign(lifestyle, { trainingRoutine: '', muscleGoals: '' });
  if (!track.sports)
    Object.assign(lifestyle, { sport: '', trainingIntensity: '', performanceGoals: '' });

  const personal = { ...values.personal };
  if (track.isKids) personal.age = '';
  else personal.relationship = '';

  return {
    program: values.program,
    personal,
    ...(track.isKids && { child: values.child }),
    measurements: values.measurements,
    health,
    nutrition,
    lifestyle,
    goals,
    consent: values.consent === true,
  };
}
