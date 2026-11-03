import { useFormContext, useWatch } from 'react-hook-form';
import * as A from '@shared/assessment.js';
import { relevance } from '../../assessment.config';
import styles from './ReviewStep.module.css';

const filled = (v) =>
  Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && String(v).trim() !== '';
const one = (options) => (v) => A.labelOf(options, v);
const many = (options) => (v) => v.map((x) => A.labelOf(options, x)).join(', ');
const unit = (u) => (v) => `${v} ${u}`;

/** [label, value, format?] rows → only answered rows, formatted. */
const rows = (list) =>
  list
    .filter(([, value]) => filled(value))
    .map(([label, value, format]) => [label, format ? format(value) : value]);

function buildSections(v, { track, programTitle, reportFile }) {
  const show = relevance(v, track);
  const bmi = A.calculateBmi(v.measurements.weightKg, v.measurements.heightCm);
  const p = v.personal;
  const h = v.health;
  const n = v.nutrition;
  const l = v.lifestyle;
  const g = v.goals;

  return [
    {
      step: 0,
      title: track.isKids ? 'Child & guardian' : 'Personal information',
      rows: rows(
        track.isKids
          ? [
              ['Program', programTitle],
              ['Child', v.child.nameOrInitials],
              ['Child’s age', v.child.age, unit('years')],
              ['Child’s gender', v.child.gender, one(A.GENDERS)],
              ['Parent / guardian', p.fullName],
              ['Relationship', p.relationship, one(A.GUARDIAN_RELATIONS)],
              ['Email', p.email],
              ['Phone', p.phone],
              ['City', p.city],
            ]
          : [
              ['Program', programTitle],
              ['Name', p.fullName],
              ['Age', p.age, unit('years')],
              ['Gender', p.gender, one(A.GENDERS)],
              ['Email', p.email],
              ['Phone', p.phone],
              ['City', p.city],
              ['Occupation', p.occupation],
            ],
      ),
    },
    {
      step: 1,
      title: 'Body measurements',
      rows: rows([
        ['Weight', v.measurements.weightKg, unit('kg')],
        ['Height', v.measurements.heightCm, unit('cm')],
        ['BMI (calculated)', bmi != null ? bmi.toFixed(1) : ''],
        ['Target weight', v.measurements.targetWeightKg, unit('kg')],
        ['Waist', v.measurements.waistCm, unit('cm')],
        ['Previous weight', v.measurements.previousWeightKg, unit('kg')],
        ['Recent weight changes', v.measurements.recentWeightChange, one(A.WEIGHT_CHANGES)],
      ]),
    },
    {
      step: 2,
      title: 'Health information',
      rows: rows(
        [
          ['Medical conditions', h.conditions, many(A.CONDITIONS)],
          show.otherCondition && ['Other condition', h.otherCondition],
          ...(show.pcos
            ? [
                ['PCOS diagnosed by a professional', h.pcos.diagnosed, one(A.YES_NO_UNSURE)],
                ['Cycle regularity', h.pcos.cycleRegularity, one(A.CYCLE_REGULARITY)],
                ['PCOS-related symptoms', h.pcos.symptoms],
              ]
            : []),
          ...(show.diabetes
            ? [
                ['Diabetes type', h.diabetes.type, one(A.DIABETES_TYPES)],
                ['Diabetes treatment', h.diabetes.treatment],
                ['Recent blood sugar', h.diabetes.bloodSugar],
              ]
            : []),
          ...(show.thyroid
            ? [
                ['Thyroid condition', h.thyroid.type, one(A.THYROID_TYPES)],
                ['Thyroid treatment', h.thyroid.treatment],
              ]
            : []),
          ...(show.digestive
            ? [
                ['Digestive symptoms', h.digestive.symptoms, many(A.DIGESTIVE_SYMPTOMS)],
                [
                  'Other digestive symptoms',
                  h.digestive.symptoms.includes('other') ? h.digestive.other : '',
                ],
                ['Symptom frequency', h.digestive.frequency, one(A.SYMPTOM_FREQUENCY)],
              ]
            : []),
          ...(track.lifestyleDisorders
            ? [
                ['Current treatment', h.currentTreatment],
                ['Lifestyle challenges', h.lifestyleChallenges],
              ]
            : []),
          ['Medications', h.medications],
          ['Supplements', h.supplements],
          ['Allergies', h.allergies],
          ['Food intolerances', h.intolerances],
          ['Previous surgeries', h.surgeries],
          ['Family medical history', h.familyHistory],
          ['Other health information', h.additionalInfo],
          [
            'Medical report',
            reportFile ? `${reportFile.name} — not uploaded; your dietitian will ask for it` : '',
          ],
        ].filter(Boolean),
      ),
    },
    {
      step: 3,
      title: 'Nutrition & food habits',
      rows: rows(
        [
          ['Dietary preference', n.dietaryPreference, one(A.DIETARY_PREFERENCES)],
          show.dietOther && ['Preference details', n.dietaryPreferenceOther],
          ['Foods avoided', n.foodsAvoided],
          ['Favourite foods', n.favoriteFoods],
          ['Meals per day', n.mealsPerDay, one(A.MEALS_PER_DAY)],
          ['Water intake', n.waterIntake, one(A.WATER_INTAKE)],
          ['Breakfast', n.breakfast, one(A.BREAKFAST_HABITS)],
          ['Eating out', n.eatingOut, one(A.FREQUENCY)],
          ['Junk food', n.junkFood, one(A.FREQUENCY)],
          ['Sweets & sugary drinks', n.sugar, one(A.FREQUENCY)],
          ['Tea / coffee', n.caffeine, one(A.CAFFEINE)],
          ['Typical day of eating', n.typicalDay],
        ].filter(Boolean),
      ),
    },
    {
      step: 4,
      title: 'Lifestyle',
      rows: rows([
        ['Activity level', l.activityLevel, one(A.ACTIVITY_LEVELS)],
        ['Exercise type', l.exerciseType],
        [
          track.sports ? 'Training frequency' : 'Exercise frequency',
          l.exerciseFrequency,
          one(A.EXERCISE_FREQUENCY),
        ],
        ...(track.muscle
          ? [
              ['Training routine', l.trainingRoutine],
              ['Muscle-building goals', l.muscleGoals],
            ]
          : []),
        ...(track.sports
          ? [
              ['Sport', l.sport],
              ['Training intensity', l.trainingIntensity, one(A.TRAINING_INTENSITY)],
              ['Performance goals', l.performanceGoals],
            ]
          : []),
        ['Sleep', l.sleepDuration, one(A.SLEEP_DURATION)],
        ['Sleep quality', l.sleepQuality, one(A.SLEEP_QUALITY)],
        ['Daily routine', l.workRoutine, one(A.WORK_ROUTINES)],
        ['Stress level', l.stressLevel, one(A.STRESS_LEVELS)],
      ]),
    },
    {
      step: 5,
      title: 'Goals & additional information',
      rows: rows(
        [
          ['Goals', g.goals, many(A.GOALS)],
          show.otherGoal && ['Other goal', g.otherGoal],
          track.weightLoss && ['Previous weight-loss attempts', g.weightLossAttempts],
          [track.weightLoss ? 'Weight-related challenges' : 'Challenges', g.challenges],
          ['Desired timeline', g.timeline, one(A.TIMELINES)],
          ['Biggest health concern', g.biggestConcern],
          ['Previous diet plans', g.previousDiets],
          ['Expectations', g.expectations],
          ['Anything else', g.anythingElse],
        ].filter(Boolean),
      ),
    },
  ];
}

export default function ReviewStep({ track, programTitle, reportFile, onEdit, consentError }) {
  const values = useWatch();
  const { register } = useFormContext();
  const sections = buildSections(values, { track, programTitle, reportFile });

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.title}
          className={styles.section}
          aria-labelledby={`review-${section.step}`}
        >
          <div className={styles.head}>
            <h3 id={`review-${section.step}`} className={styles.title}>
              {section.title}
            </h3>
            <button type="button" className={styles.edit} onClick={() => onEdit(section.step)}>
              Edit<span className="visually-hidden"> {section.title}</span>
            </button>
          </div>
          {section.rows.length ? (
            <dl className={styles.list}>
              {section.rows.map(([label, value]) => (
                <div key={label} className={styles.row}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className={styles.skipped}>Skipped — that’s fine.</p>
          )}
        </section>
      ))}

      <div className={styles.consent}>
        <label className={styles.consentLabel}>
          <input
            type="checkbox"
            {...register('consent')}
            aria-invalid={consentError ? true : undefined}
            aria-describedby={consentError ? 'consent-error' : undefined}
          />
          <span>
            I consent to Viviora securely storing the information in this assessment and sharing it
            with my assigned Viviora dietitian, only for my nutrition assessment and consultation.
            <span className={styles.required} aria-hidden="true">
              {' '}
              *
            </span>
          </span>
        </label>
        {consentError && (
          <p id="consent-error" className={styles.error}>
            {consentError}
          </p>
        )}
      </div>
    </>
  );
}
