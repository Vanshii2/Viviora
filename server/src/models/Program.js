import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const optionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const programSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    duration: { type: String, trim: true },
    audience: [{ type: String, trim: true }],
    benefits: [{ type: String, trim: true }],
    included: [{ type: String, trim: true }],
    /** Price in rupees; null = "Pricing coming soon". */
    price: { type: Number, min: 0, default: null },
    /** Regular price (₹) shown struck through when higher than price; null hides the discount. */
    compareAtPrice: { type: Number, min: 0, default: null },
    faqs: [faqSchema],
    options: [optionSchema],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

programSchema.index({ isPublished: 1, order: 1 });
programSchema.index({ 'options.slug': 1 }, { unique: true, sparse: true });

export const Program = mongoose.model('Program', programSchema);
