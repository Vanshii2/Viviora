import { GENDERS, GUARDIAN_RELATIONS } from '@shared/assessment.js';
import { ChoiceField, FieldRow, QuestionGroup, SelectField, TextField } from '../fields';

export default function BasicStep({ isKids, programOptions }) {
  return (
    <>
      {programOptions && (
        <SelectField
          name="program"
          label="Which program are you interested in?"
          options={programOptions}
          required
        />
      )}

      {isKids ? (
        <>
          <QuestionGroup
            tone="highlight"
            title="About your child"
            description="For Kids Nutrition, a parent or guardian completes this assessment on the child’s behalf."
          >
            <FieldRow>
              <TextField
                name="child.nameOrInitials"
                label="Child’s name or initials"
                required
                autoComplete="off"
              />
              <TextField
                name="child.age"
                label="Child’s age"
                required
                type="number"
                inputMode="numeric"
                min={1}
                max={17}
                suffix="years"
              />
            </FieldRow>
            <ChoiceField name="child.gender" label="Child’s gender" options={GENDERS} />
          </QuestionGroup>

          <QuestionGroup
            title="Parent or guardian details"
            description="We’ll use these to contact you about the consultation."
          >
            <TextField
              name="personal.fullName"
              label="Your full name"
              required
              autoComplete="name"
            />
            <SelectField
              name="personal.relationship"
              label="Your relationship to the child"
              options={GUARDIAN_RELATIONS}
            />
            <FieldRow>
              <TextField
                name="personal.email"
                label="Email address"
                required
                type="email"
                inputMode="email"
                autoComplete="email"
              />
              <TextField
                name="personal.phone"
                label="Phone number"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
              />
            </FieldRow>
            <TextField name="personal.city" label="City" autoComplete="address-level2" />
          </QuestionGroup>
        </>
      ) : (
        <>
          <FieldRow>
            <TextField name="personal.fullName" label="Full name" required autoComplete="name" />
            <TextField
              name="personal.age"
              label="Age"
              required
              type="number"
              inputMode="numeric"
              min={1}
              max={120}
              suffix="years"
            />
          </FieldRow>
          <ChoiceField name="personal.gender" label="Gender" options={GENDERS} />
          <FieldRow>
            <TextField
              name="personal.email"
              label="Email address"
              required
              type="email"
              inputMode="email"
              autoComplete="email"
            />
            <TextField
              name="personal.phone"
              label="Phone number"
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
            />
          </FieldRow>
          <FieldRow>
            <TextField name="personal.city" label="City" autoComplete="address-level2" />
            <TextField
              name="personal.occupation"
              label="Occupation"
              autoComplete="organization-title"
            />
          </FieldRow>
        </>
      )}
    </>
  );
}
