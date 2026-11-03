import {
  ACTIVITY_LEVELS,
  EXERCISE_FREQUENCY,
  SLEEP_DURATION,
  SLEEP_QUALITY,
  STRESS_LEVELS,
  TRAINING_INTENSITY,
  WORK_ROUTINES,
} from '@shared/assessment.js';
import {
  ChoiceField,
  FieldRow,
  QuestionGroup,
  SelectField,
  TextAreaField,
  TextField,
} from '../fields';

export default function LifestyleStep({ track }) {
  return (
    <>
      <ChoiceField
        name="lifestyle.activityLevel"
        label="Physical activity level"
        options={ACTIVITY_LEVELS}
      />
      <FieldRow>
        <TextField
          name="lifestyle.exerciseType"
          label="Type of exercise"
          placeholder="e.g. walking, yoga, gym"
        />
        <SelectField
          name="lifestyle.exerciseFrequency"
          label={track.sports ? 'Training frequency' : 'Exercise frequency'}
          options={EXERCISE_FREQUENCY}
        />
      </FieldRow>

      {track.muscle && (
        <QuestionGroup tone="highlight" title="Training" description="All optional.">
          <TextAreaField
            name="lifestyle.trainingRoutine"
            label="Current training routine"
            rows={2}
            placeholder="e.g. Push/pull/legs, 5 days a week"
          />
          <TextField name="lifestyle.muscleGoals" label="Muscle-building goals" />
        </QuestionGroup>
      )}

      {track.sports && (
        <QuestionGroup tone="highlight" title="Your sport" description="All optional.">
          <FieldRow>
            <TextField name="lifestyle.sport" label="Sport or activity" />
            <SelectField
              name="lifestyle.trainingIntensity"
              label="Training intensity"
              options={TRAINING_INTENSITY}
            />
          </FieldRow>
          <TextAreaField name="lifestyle.performanceGoals" label="Performance goals" rows={2} />
        </QuestionGroup>
      )}

      <ChoiceField name="lifestyle.sleepDuration" label="Daily sleep" options={SLEEP_DURATION} />
      <FieldRow>
        <SelectField name="lifestyle.sleepQuality" label="Sleep quality" options={SLEEP_QUALITY} />
        <SelectField name="lifestyle.workRoutine" label="Daily routine" options={WORK_ROUTINES} />
      </FieldRow>
      <ChoiceField name="lifestyle.stressLevel" label="Stress level" options={STRESS_LEVELS} />
    </>
  );
}
