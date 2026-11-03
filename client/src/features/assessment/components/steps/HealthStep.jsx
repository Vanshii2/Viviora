import { useWatch } from 'react-hook-form';
import {
  CONDITIONS,
  CYCLE_REGULARITY,
  DIABETES_TYPES,
  DIGESTIVE_SYMPTOMS,
  EXCLUSIVE_CONDITIONS,
  SYMPTOM_FREQUENCY,
  THYROID_TYPES,
  YES_NO_UNSURE,
} from '@shared/assessment.js';
import { relevance } from '../../assessment.config';
import ReportUpload from '../ReportUpload';
import {
  ChoiceField,
  FieldRow,
  QuestionGroup,
  SelectField,
  TextAreaField,
  TextField,
} from '../fields';

export default function HealthStep({ track, isKids, reportFile, onReportChange }) {
  const values = useWatch();
  const show = relevance(values, track);

  return (
    <>
      <ChoiceField
        name="health.conditions"
        label={
          isKids
            ? 'Does your child have any existing medical conditions?'
            : 'Do you have any existing medical conditions?'
        }
        hint="Select all that apply."
        options={CONDITIONS}
        multiple
        exclusive={EXCLUSIVE_CONDITIONS}
        required
      />
      {show.otherCondition && <TextField name="health.otherCondition" label="Please specify" />}

      {show.pcos && (
        <QuestionGroup
          tone="highlight"
          title="PCOS & menstrual health"
          description="All optional — share only what you’re comfortable with."
        >
          <ChoiceField
            name="health.pcos.diagnosed"
            label="Was PCOS diagnosed by a healthcare professional?"
            options={YES_NO_UNSURE}
          />
          <SelectField
            name="health.pcos.cycleRegularity"
            label="Menstrual cycle regularity"
            options={CYCLE_REGULARITY}
          />
          <TextAreaField
            name="health.pcos.symptoms"
            label="Any related symptoms you would like to share?"
            rows={2}
          />
        </QuestionGroup>
      )}

      {show.diabetes && (
        <QuestionGroup tone="highlight" title="Diabetes" description="All optional.">
          <SelectField
            name="health.diabetes.type"
            label="Type of diabetes"
            options={DIABETES_TYPES}
          />
          <FieldRow>
            <TextField
              name="health.diabetes.treatment"
              label="Current treatment"
              placeholder="e.g. tablets, insulin, diet only"
            />
            <TextField
              name="health.diabetes.bloodSugar"
              label="Recent blood sugar information"
              placeholder="e.g. HbA1c 6.8% (Sept)"
            />
          </FieldRow>
        </QuestionGroup>
      )}

      {show.thyroid && (
        <QuestionGroup tone="highlight" title="Thyroid" description="All optional.">
          <ChoiceField
            name="health.thyroid.type"
            label="Which thyroid condition?"
            options={THYROID_TYPES}
          />
          <TextField name="health.thyroid.treatment" label="Current treatment" />
        </QuestionGroup>
      )}

      {show.digestive && (
        <QuestionGroup
          tone="highlight"
          title="Digestion"
          description="All optional — this helps us understand your gut health."
        >
          <ChoiceField
            name="health.digestive.symptoms"
            label="Which digestive symptoms do you experience?"
            options={DIGESTIVE_SYMPTOMS}
            multiple
          />
          {(values.health?.digestive?.symptoms ?? []).includes('other') && (
            <TextField name="health.digestive.other" label="Other digestive symptoms" />
          )}
          <SelectField
            name="health.digestive.frequency"
            label="How often do symptoms like bloating occur?"
            options={SYMPTOM_FREQUENCY}
          />
        </QuestionGroup>
      )}

      {track.lifestyleDisorders && (
        <QuestionGroup tone="highlight" title="Managing your condition" description="All optional.">
          <TextField name="health.currentTreatment" label="Current treatment for your condition" />
          <TextAreaField
            name="health.lifestyleChallenges"
            label="Lifestyle challenges you face"
            rows={2}
          />
        </QuestionGroup>
      )}

      <FieldRow>
        <TextField name="health.medications" label="Current medications" />
        <TextField name="health.supplements" label="Supplements" />
      </FieldRow>
      <FieldRow>
        <TextField name="health.allergies" label="Known allergies" />
        <TextField
          name="health.intolerances"
          label="Food intolerances"
          placeholder="e.g. lactose, gluten"
        />
      </FieldRow>
      <FieldRow>
        <TextField name="health.surgeries" label="Previous surgeries" />
        <TextField name="health.familyHistory" label="Family medical history" />
      </FieldRow>
      <TextAreaField
        name="health.additionalInfo"
        label="Anything else about your health?"
        rows={2}
      />

      <ReportUpload file={reportFile} onChange={onReportChange} />
    </>
  );
}
