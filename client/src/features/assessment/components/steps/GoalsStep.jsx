import { useWatch } from 'react-hook-form';
import { GOALS, TIMELINES } from '@shared/assessment.js';
import {
  ChoiceField,
  FieldRow,
  QuestionGroup,
  SelectField,
  TextAreaField,
  TextField,
} from '../fields';

export default function GoalsStep({ track, programTitle }) {
  const goals = useWatch({ name: 'goals.goals' }) ?? [];
  return (
    <>
      <ChoiceField
        name="goals.goals"
        label="What are your nutrition goals?"
        hint={
          programTitle
            ? `We’ve selected the goal for ${programTitle}. Add any others that apply.`
            : 'Select all that apply.'
        }
        options={GOALS}
        multiple
        required
      />
      {goals.includes('other') && <TextField name="goals.otherGoal" label="Other goal" />}

      {track.weightLoss && (
        <QuestionGroup
          tone="highlight"
          title="Your weight-loss journey"
          description="All optional. You can add a target weight in Body measurements."
        >
          <TextAreaField
            name="goals.weightLossAttempts"
            label="Previous weight-loss attempts"
            rows={2}
          />
          <TextAreaField name="goals.challenges" label="Weight-related challenges" rows={2} />
        </QuestionGroup>
      )}

      <FieldRow>
        <SelectField name="goals.timeline" label="Desired timeline" options={TIMELINES} />
        <TextField name="goals.biggestConcern" label="Biggest health concern" />
      </FieldRow>
      <TextAreaField name="goals.previousDiets" label="Diet plans you’ve tried before" rows={2} />
      {!track.weightLoss && (
        <TextAreaField name="goals.challenges" label="Challenges you’ve faced" rows={2} />
      )}
      <TextAreaField name="goals.expectations" label="What do you expect from Viviora?" rows={2} />
      <TextAreaField
        name="goals.anythingElse"
        label="Anything else your dietitian should know?"
        rows={3}
      />
    </>
  );
}
