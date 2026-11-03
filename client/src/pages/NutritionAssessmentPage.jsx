import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { AlertCircle, Info } from 'lucide-react';
import { getProgramTrack, goalsForProgram } from '@shared/assessment.js';
import PageMeta from '../components/common/PageMeta';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { usePrograms, useProgram } from '../features/programs/hooks/usePrograms';
import { STEPS, emptyAssessment } from '../features/assessment/assessment.config';
import { validateStep } from '../features/assessment/assessment.validation';
import { toPayload } from '../features/assessment/assessment.payload';
import { assessmentService } from '../features/assessment/assessment.service';
import { clearDraft, loadDraft, saveDraft } from '../features/assessment/assessment.draft';
import StepProgress from '../features/assessment/components/StepProgress';
import AssessmentSuccess from '../features/assessment/components/AssessmentSuccess';
import BasicStep from '../features/assessment/components/steps/BasicStep';
import MeasurementsStep from '../features/assessment/components/steps/MeasurementsStep';
import HealthStep from '../features/assessment/components/steps/HealthStep';
import NutritionStep from '../features/assessment/components/steps/NutritionStep';
import LifestyleStep from '../features/assessment/components/steps/LifestyleStep';
import GoalsStep from '../features/assessment/components/steps/GoalsStep';
import ReviewStep from '../features/assessment/components/steps/ReviewStep';
import styles from './NutritionAssessmentPage.module.css';

const REVIEW = STEPS.length - 1;
const SECTION_STEP = {
  program: 0,
  personal: 0,
  child: 0,
  measurements: 1,
  health: 2,
  nutrition: 3,
  lifestyle: 4,
  goals: 5,
  consent: 6,
};

/** Deep-merge a saved draft into fresh defaults (only known sections). */
const mergeDraft = (base, draft) =>
  Object.fromEntries(
    Object.entries(base).map(([key, value]) =>
      draft?.[key] && typeof value === 'object' && !Array.isArray(value)
        ? [key, { ...value, ...draft[key] }]
        : [key, value],
    ),
  );

export default function NutritionAssessmentPage() {
  const [searchParams] = useSearchParams();
  const programParam = (searchParams.get('program') ?? '').trim().toLowerCase();

  const programQuery = useProgram(programParam);
  const listQuery = usePrograms();
  const methods = useForm({ defaultValues: emptyAssessment() });
  const { watch, getValues, setValue, setError, clearErrors, reset, formState } = methods;

  const [step, setStep] = useState(0);
  const [returnToReview, setReturnToReview] = useState(false);
  const [reportFile, setReportFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [demoNotice, setDemoNotice] = useState(false);
  const [result, setResult] = useState(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const preparedFor = useRef(null);
  const submitLock = useRef(false); // blocks double submits even before React re-renders
  const headingRef = useRef(null);
  const topRef = useRef(null);

  // ---- which program? (from the URL, or chosen in step 1 if missing/unknown) -----------------
  const resolved = programQuery.data; // undefined while loading, null if not found
  const needsProgram =
    !programParam || (programQuery.isSuccess && resolved === null) || programQuery.isError;
  const chosenSlug = watch('program');
  const program = useMemo(() => {
    if (resolved)
      return {
        slug: resolved.slug,
        title: resolved.title,
        parentSlug: resolved.parent?.slug ?? resolved.slug,
      };
    const fromList = listQuery.data?.find((p) => p.slug === chosenSlug);
    return fromList
      ? { slug: fromList.slug, title: fromList.title, parentSlug: fromList.slug }
      : null;
  }, [resolved, listQuery.data, chosenSlug]);
  const track = useMemo(() => getProgramTrack(program?.slug, program?.parentSlug), [program]);
  const programOptions = needsProgram
    ? (listQuery.data ?? []).map((p) => ({ value: p.slug, label: p.title }))
    : null;

  // ---- once the program is known: restore draft, pre-select its goals ------------------------
  useEffect(() => {
    if (!program || preparedFor.current === program.slug) return;
    preparedFor.current = program.slug;
    const draft = loadDraft(program.slug);
    if (draft) {
      reset(mergeDraft({ ...getValues(), program: program.slug }, draft), {
        keepDefaultValues: true,
      });
      setDraftRestored(true);
    } else {
      setValue('program', program.slug);
    }
    if (getValues('goals.goals').length === 0)
      setValue('goals.goals', goalsForProgram(program.slug, program.parentSlug));
  }, [program, getValues, reset, setValue]);

  // ---- keep a privacy-safe draft; clear a field's error as soon as it changes ---------------
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name) clearErrors(name);
      if (preparedFor.current && !result) saveDraft(preparedFor.current, values);
    });
    return () => subscription.unsubscribe();
  }, [watch, clearErrors, result]);

  // ---- warn before leaving with unsent answers ------------------------------------------------
  useEffect(() => {
    if (!formState.isDirty || result) return undefined;
    const onBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [formState.isDirty, result]);

  const goTo = (index) => {
    setStep(index);
    setSubmitError(null);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start' });
      headingRef.current?.focus({ preventScroll: true });
    });
  };

  const showErrors = (errors) => {
    Object.entries(errors).forEach(([path, message]) =>
      setError(path, { type: 'manual', message }),
    );
    requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
  };

  const ctx = { isKids: track.isKids, needsProgram };

  const handleContinue = () => {
    const errors = validateStep(STEPS[step].id, getValues(), ctx);
    if (Object.keys(errors).length) return showErrors(errors);
    if (returnToReview) {
      setReturnToReview(false);
      return goTo(REVIEW);
    }
    return goTo(step + 1);
  };

  const handleEdit = (index) => {
    setReturnToReview(true);
    goTo(index);
  };

  const handleSubmit = async () => {
    if (submitLock.current) return;
    const values = getValues();
    // Re-check every step's required answers before sending.
    for (const [index, { id }] of STEPS.entries()) {
      const errors = validateStep(id, values, ctx);
      if (Object.keys(errors).length) {
        if (index !== REVIEW) {
          setReturnToReview(true);
          goTo(index);
        }
        return showErrors(errors);
      }
    }

    submitLock.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    setDemoNotice(false);
    try {
      const response = await assessmentService.submit(
        toPayload(values, { track, hasReport: Boolean(reportFile) }),
      );
      if (response?.demo) {
        setDemoNotice(true);
        return;
      }
      clearDraft();
      setResult(response);
      window.scrollTo(0, 0);
    } catch (error) {
      setSubmitError(error);
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  const age = Number(watch(track.isKids ? 'child.age' : 'personal.age'));
  const isMinor = track.isKids || (Number.isFinite(age) && age > 0 && age < 18);
  const current = STEPS[step];
  const programTitle = program?.title;

  if (result) {
    return (
      <Container narrow className={styles.page}>
        <PageMeta title="Assessment submitted" />
        <AssessmentSuccess result={result} />
      </Container>
    );
  }

  const stepProps = { track, isKids: track.isKids, programTitle };

  return (
    <div className={styles.wrap}>
      <PageMeta
        title="Nutrition assessment"
        description="Share your health and nutrition details with your Viviora dietitian."
      />
      <Container narrow className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>
            Nutrition assessment{programTitle ? ` · ${programTitle}` : ''}
          </p>
          <h1 className={styles.title}>Let’s understand your health and nutrition needs.</h1>
          <p className={styles.lead}>
            Share a few details so our dietitian can better understand your goals and prepare
            personalized guidance. Required questions are marked with an asterisk (
            <span className={styles.star}>*</span>). You can skip optional questions.
          </p>
          {programParam && programQuery.isSuccess && resolved === null && (
            <p className={styles.notice}>
              <Info size={18} aria-hidden="true" />
              <span>We couldn’t find that program — please choose one below.</span>
            </p>
          )}
          {draftRestored && (
            <p className={styles.notice}>
              <Info size={18} aria-hidden="true" />
              <span>
                We’ve restored your earlier answers from this browser tab. For your privacy, body
                measurements and health details are never saved in the browser.
              </span>
            </p>
          )}
        </header>

        <div ref={topRef} className={styles.card}>
          <StepProgress steps={STEPS} current={step} />

          <FormProvider {...methods}>
            <form
              className={styles.form}
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                if (step === REVIEW) handleSubmit();
                else handleContinue();
              }}
              aria-labelledby="step-title"
            >
              <div className={styles.stepHead}>
                <h2 id="step-title" ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
                  {current.title}
                </h2>
                <p className={styles.stepDescription}>{current.description}</p>
              </div>

              {programParam && programQuery.isPending ? (
                <p className={styles.loading} role="status">
                  Loading program…
                </p>
              ) : (
                <div className={styles.fields}>
                  {current.id === 'basic' && (
                    <BasicStep {...stepProps} programOptions={programOptions} />
                  )}
                  {current.id === 'measurements' && (
                    <MeasurementsStep {...stepProps} isMinor={isMinor} />
                  )}
                  {current.id === 'health' && (
                    <HealthStep
                      {...stepProps}
                      reportFile={reportFile}
                      onReportChange={setReportFile}
                    />
                  )}
                  {current.id === 'nutrition' && <NutritionStep {...stepProps} />}
                  {current.id === 'lifestyle' && <LifestyleStep {...stepProps} />}
                  {current.id === 'goals' && <GoalsStep {...stepProps} />}
                  {current.id === 'review' && (
                    <ReviewStep
                      {...stepProps}
                      reportFile={reportFile}
                      onEdit={handleEdit}
                      consentError={formState.errors.consent?.message}
                    />
                  )}
                </div>
              )}

              <div aria-live="assertive">
                {demoNotice && (
                  <p className={styles.notice}>
                    <Info size={18} aria-hidden="true" />
                    <span>
                      This is a preview of the website — assessments can’t be submitted here, so
                      your answers have <strong>not</strong> been sent.
                    </span>
                  </p>
                )}
                {submitError && (
                  <div className={styles.alert}>
                    <AlertCircle size={18} aria-hidden="true" />
                    <div>
                      <p>
                        {submitError.code === 'VALIDATION_ERROR'
                          ? 'Some answers need attention:'
                          : `We couldn’t submit your assessment. ${submitError.message}`}
                      </p>
                      {submitError.code === 'VALIDATION_ERROR' && (
                        <ul>
                          {Object.entries(submitError.details ?? {}).map(([section, messages]) => (
                            <li key={section}>
                              {messages.join(' ')}{' '}
                              {SECTION_STEP[section] !== undefined &&
                                SECTION_STEP[section] !== REVIEW && (
                                  <button
                                    type="button"
                                    className={styles.linkButton}
                                    onClick={() => handleEdit(SECTION_STEP[section])}
                                  >
                                    Go to {STEPS[SECTION_STEP[section]].title}
                                  </button>
                                )}
                            </li>
                          ))}
                        </ul>
                      )}
                      {submitError.code !== 'VALIDATION_ERROR' && (
                        <p>Your answers are still here — please try again.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.nav}>
                {step > 0 ? (
                  <Button variant="outline" onClick={() => goTo(step - 1)} disabled={isSubmitting}>
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                <Button
                  type="submit"
                  variant="dark"
                  withArrow
                  disabled={isSubmitting}
                  aria-busy={isSubmitting || undefined}
                >
                  {step === REVIEW
                    ? isSubmitting
                      ? 'Submitting…'
                      : 'Submit Assessment'
                    : returnToReview
                      ? 'Save & return to review'
                      : step === 4
                        ? 'Continue (or skip)'
                        : 'Continue'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </Container>
    </div>
  );
}
