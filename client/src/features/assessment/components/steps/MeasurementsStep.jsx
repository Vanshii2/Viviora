import { WEIGHT_CHANGES } from '@shared/assessment.js';
import BmiCard from '../BmiCard';
import { FieldRow, SelectField, TextField } from '../fields';

const num = { type: 'number', inputMode: 'decimal', step: '0.1' };

export default function MeasurementsStep({ isKids, isMinor }) {
  const who = isKids ? 'Child’s' : 'Current';
  return (
    <>
      <FieldRow>
        <TextField
          name="measurements.weightKg"
          label={`${who} weight`}
          required
          suffix="kg"
          min={2}
          max={350}
          {...num}
        />
        <TextField
          name="measurements.heightCm"
          label={isKids ? 'Child’s height' : 'Height'}
          required
          suffix="cm"
          min={40}
          max={250}
          {...num}
        />
      </FieldRow>

      <BmiCard isMinor={isMinor} />

      <FieldRow>
        <TextField name="measurements.targetWeightKg" label="Target weight" suffix="kg" {...num} />
        <TextField name="measurements.waistCm" label="Waist circumference" suffix="cm" {...num} />
      </FieldRow>
      <FieldRow>
        <TextField
          name="measurements.previousWeightKg"
          label="Previous weight"
          suffix="kg"
          hint="For example, your weight a year ago."
          {...num}
        />
        <SelectField
          name="measurements.recentWeightChange"
          label="Recent weight changes"
          options={WEIGHT_CHANGES}
        />
      </FieldRow>
    </>
  );
}
