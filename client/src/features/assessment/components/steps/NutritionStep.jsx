import { useWatch } from 'react-hook-form';
import {
  BREAKFAST_HABITS,
  CAFFEINE,
  DIETARY_PREFERENCES,
  FREQUENCY,
  MEALS_PER_DAY,
  WATER_INTAKE,
} from '@shared/assessment.js';
import { ChoiceField, FieldRow, SelectField, TextAreaField, TextField } from '../fields';

export default function NutritionStep() {
  const preference = useWatch({ name: 'nutrition.dietaryPreference' });
  return (
    <>
      <ChoiceField
        name="nutrition.dietaryPreference"
        label="Dietary preference"
        options={DIETARY_PREFERENCES}
        required
      />
      {preference === 'other' && (
        <TextField
          name="nutrition.dietaryPreferenceOther"
          label="Please describe your dietary preference"
        />
      )}

      <FieldRow>
        <TextField name="nutrition.foodsAvoided" label="Foods you avoid" />
        <TextField name="nutrition.favoriteFoods" label="Favourite foods" />
      </FieldRow>
      <FieldRow>
        <SelectField name="nutrition.mealsPerDay" label="Meals per day" options={MEALS_PER_DAY} />
        <SelectField
          name="nutrition.waterIntake"
          label="Daily water intake"
          options={WATER_INTAKE}
        />
      </FieldRow>
      <FieldRow>
        <SelectField
          name="nutrition.breakfast"
          label="Do you eat breakfast?"
          options={BREAKFAST_HABITS}
        />
        <SelectField name="nutrition.eatingOut" label="Eating out" options={FREQUENCY} />
      </FieldRow>
      <FieldRow>
        <SelectField name="nutrition.junkFood" label="Junk food" options={FREQUENCY} />
        <SelectField name="nutrition.sugar" label="Sweets & sugary drinks" options={FREQUENCY} />
      </FieldRow>
      <FieldRow>
        <SelectField name="nutrition.caffeine" label="Tea / coffee" options={CAFFEINE} />
      </FieldRow>
      <TextAreaField
        name="nutrition.typicalDay"
        label="What does a typical day of eating look like?"
        placeholder="e.g. Breakfast: poha and tea · Lunch: dal, rice, sabzi · Evening: biscuits · Dinner: roti, sabzi"
        rows={3}
      />
    </>
  );
}
