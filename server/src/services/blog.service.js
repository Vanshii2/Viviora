import { BlogPost } from '../models/BlogPost.js';

const toSummary = (p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  author: p.author,
  publishedAt: p.publishedAt.toISOString().slice(0, 10),
  readingMinutes: p.readingMinutes,
  image: p.image,
});

export const blogService = {
  async listCategories() {
    const rows = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category.slug', name: { $first: '$category.name' } } },
      { $sort: { name: 1 } },
    ]);
    return rows.map((r) => ({ slug: r._id, name: r.name }));
  },

  async listPosts({ category } = {}) {
    const filter = { isPublished: true, ...(category && { 'category.slug': category }) };
    const posts = await BlogPost.find(filter).select('-body').sort({ publishedAt: -1 }).lean();
    return posts.map(toSummary);
  },

  async getBySlug(slug) {
    const post = await BlogPost.findOne({ slug, isPublished: true }).lean();
    if (!post) return null;
    return {
      ...toSummary(post),
      body: post.body.map(({ type, text, items }) => ({
        type,
        ...(text && { text }),
        ...(items?.length && { items }),
      })),
    };
  },
};
