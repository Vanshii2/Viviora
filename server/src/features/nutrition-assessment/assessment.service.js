import { calculateBmi, getProgramTrack } from '../../../../shared/assessment.js';
import { Program } from '../../models/Program.js';
import { HttpError } from '../../utils/httpError.js';
import { Assessment } from './assessment.model.js';

/** Resolves a main program or focused option slug to { slug, title, parentSlug }. */
async function resolveProgram(slug) {
  const program = await Program.findOne({ slug, isPublished: true }).select('slug title').lean();
  if (program) return { slug: program.slug, title: program.title, parentSlug: program.slug };

  const parent = await Program.findOne({ 'options.slug': slug, isPublished: true })
    .select('slug options')
    .lean();
  const option = parent?.options.find((o) => o.slug === slug);
  return option ? { slug, title: option.title, parentSlug: parent.slug } : null;
}

export const assessmentService = {
  async submit(input, { userId } = {}) {
    const program = await resolveProgram(input.program);
    if (!program) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'Please check the highlighted fields.', {
        program: ['Please choose a valid program.'],
      });
    }
    const isForChild = getProgramTrack(program.slug, program.parentSlug).isKids;

    // Who the assessment is about depends on the program (kids programs: a child, filled in by a guardian).
    if (isForChild && !input.child) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'Please check the highlighted fields.', {
        child: ["Please enter the child's details."],
      });
    }
    if (!isForChild && input.personal.age === undefined) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'Please check the highlighted fields.', {
        personal: ['Please enter your age.'],
      });
    }
    const { weightKg, heightCm } = input.measurements;

    const doc = await Assessment.create({
      ...input,
      user: userId,
      program,
      isForChild,
      child: isForChild ? input.child : undefined,
      measurements: { ...input.measurements, bmi: calculateBmi(weightKg, heightCm) ?? undefined },
      consentAt: new Date(),
      consent: undefined,
    });

    return {
      id: doc._id.toString(),
      status: doc.status,
      program: { slug: program.slug, title: program.title },
      bmi: doc.measurements.bmi ?? null,
      submittedAt: doc.createdAt.toISOString(),
    };
  },
};
