import mongoose from 'mongoose';

/** Article body is a list of typed blocks — never raw HTML. */
const blockSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['p', 'h2', 'ul'], required: true },
    text: { type: String, trim: true },
    items: [{ type: String, trim: true }],
  },
  { _id: false },
);

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    category: {
      slug: { type: String, required: true, trim: true, lowercase: true },
      name: { type: String, required: true, trim: true },
    },
    author: { type: String, required: true, trim: true },
    publishedAt: { type: Date, required: true },
    readingMinutes: { type: Number, min: 1, default: 3 },
    image: { type: String, trim: true },
    body: [blockSchema],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

blogPostSchema.index({ isPublished: 1, publishedAt: -1 });
blogPostSchema.index({ 'category.slug': 1 });

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
