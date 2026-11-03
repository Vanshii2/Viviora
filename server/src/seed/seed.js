/**
 * Seeds public content (programs, blog posts, FAQs) into MongoDB.
 *   npm run seed -w server
 *
 * Content collections are replaced wholesale with the seed files. Contact messages are never touched.
 * Refuses to run in production unless --force is passed.
 */
import { pathToFileURL } from 'node:url';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { Program } from '../models/Program.js';
import { BlogPost } from '../models/BlogPost.js';
import { Faq } from '../models/Faq.js';
import { programs, programOptions } from './data/programs.data.js';
import { blogPosts } from './data/blog.data.js';
import { homeFaqs } from './data/faqs.data.js';

export function buildSeedDocuments() {
  const programDocs = programs.map((p) => ({
    slug: p.slug,
    title: p.title,
    shortDescription: p.shortDescription,
    description: p.description,
    category: p.category,
    image: p.image,
    duration: p.duration,
    audience: p.audience,
    benefits: p.benefits,
    included: p.included,
    price: p.price,
    faqs: p.faqs.map(({ id, question, answer }) => ({ key: id, question, answer })),
    options: programOptions
      .filter((o) => o.parentSlug === p.slug)
      .map(({ slug, title, shortDescription }) => ({ slug, title, shortDescription })),
    featured: p.featured,
    order: p.order,
  }));

  const blogDocs = blogPosts.map((post) => ({ ...post, publishedAt: new Date(post.publishedAt) }));
  const faqDocs = homeFaqs.map(({ id, question, answer }, index) => ({
    key: id,
    scope: 'home',
    question,
    answer,
    order: index + 1,
  }));

  return { programDocs, blogDocs, faqDocs };
}

export async function seedDatabase() {
  const { programDocs, blogDocs, faqDocs } = buildSeedDocuments();
  await Promise.all([Program.deleteMany({}), BlogPost.deleteMany({}), Faq.deleteMany({})]);
  await Program.insertMany(programDocs);
  await BlogPost.insertMany(blogDocs);
  await Faq.insertMany(faqDocs);
  await Promise.all([Program.syncIndexes(), BlogPost.syncIndexes(), Faq.syncIndexes()]);
  return { programs: programDocs.length, blogPosts: blogDocs.length, faqs: faqDocs.length };
}

async function main() {
  if (!env.MONGO_URI) {
    console.error('MONGO_URI is not set. Add it to server/.env first.');
    process.exit(1);
  }
  if (env.isProduction && !process.argv.includes('--force')) {
    console.error('Refusing to seed in production without --force.');
    process.exit(1);
  }
  await mongoose.connect(env.MONGO_URI);
  console.log(`Connected to database "${mongoose.connection.name}". Seeding…`);
  const counts = await seedDatabase();
  console.log(
    `Seeded ${counts.programs} programs, ${counts.blogPosts} blog posts, ${counts.faqs} FAQs.`,
  );
  await mongoose.disconnect();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(async (error) => {
    console.error('Seeding failed:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  });
}
