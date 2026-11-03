import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    scope: { type: String, enum: ['home'], default: 'home' },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

faqSchema.index({ scope: 1, key: 1 }, { unique: true });

export const Faq = mongoose.model('Faq', faqSchema);
