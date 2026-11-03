import { Program } from '../models/Program.js';

const CARD_FIELDS =
  'slug title shortDescription image featured order price compareAtPrice duration';

/** Public pricing shape; discount only when the regular price is genuinely higher. */
const toPricing = ({ price, compareAtPrice }) => {
  const hasDiscount = price != null && compareAtPrice != null && compareAtPrice > price;
  return {
    price: price ?? null,
    compareAtPrice: hasDiscount ? compareAtPrice : null,
    discountPercent: hasDiscount
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : null,
  };
};

const toCard = (p) => ({
  slug: p.slug,
  title: p.title,
  shortDescription: p.shortDescription,
  image: p.image,
  featured: p.featured,
  duration: p.duration,
  ...toPricing(p),
});

const toFaqs = (faqs = []) =>
  faqs.map(({ key, question, answer }) => ({ id: key, question, answer }));

const toDetail = (p) => ({
  slug: p.slug,
  title: p.title,
  shortDescription: p.shortDescription,
  description: p.description,
  category: p.category,
  image: p.image,
  fallbackImage: null,
  duration: p.duration,
  audience: p.audience,
  benefits: p.benefits,
  included: p.included,
  ...toPricing(p),
  faqs: toFaqs(p.faqs),
  options: p.options.map(({ slug, title, shortDescription }) => ({
    slug,
    title,
    shortDescription,
  })),
  parent: null,
});

export const programService = {
  async list({ featured } = {}) {
    const filter = { isPublished: true, ...(featured !== undefined && { featured }) };
    const programs = await Program.find(filter).select(CARD_FIELDS).sort({ order: 1 }).lean();
    return programs.map(toCard);
  },

  /**
   * Finds a main program by slug, or a focused option by its slug. Options inherit their
   * parent's details and reference the parent. Returns null when nothing matches.
   */
  async getBySlug(slug) {
    const program = await Program.findOne({ slug, isPublished: true }).lean();
    if (program) return toDetail(program);

    const parent = await Program.findOne({ 'options.slug': slug, isPublished: true }).lean();
    if (!parent) return null;

    const option = parent.options.find((o) => o.slug === slug);
    return {
      ...toDetail(parent),
      slug: option.slug,
      title: option.title,
      shortDescription: option.shortDescription,
      description: `${option.shortDescription} ${parent.description}`,
      image: `/images/programs/${option.slug}.jpg`,
      fallbackImage: parent.image,
      options: [],
      parent: { slug: parent.slug, title: parent.title },
    };
  },
};
