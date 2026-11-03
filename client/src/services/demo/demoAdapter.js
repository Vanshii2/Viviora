/**
 * DEMO MODE ONLY (VITE_DEMO_MODE=true) — used for the static GitHub Pages preview, which has no server.
 *
 * An axios adapter that answers the same /api/v1 requests from the seed content bundled at build time,
 * mirroring server/src/services/*. Normal builds never include this file.
 * The contact form is NOT sent in demo mode; the response says so (`demo: true`).
 */
import { AxiosError } from 'axios';
import { programOptions, programs } from '../../../../server/src/seed/data/programs.data.js';
import { blogPosts } from '../../../../server/src/seed/data/blog.data.js';
import { homeFaqs } from '../../../../server/src/seed/data/faqs.data.js';

const SLUG = /^[a-z0-9-]{1,80}$/;

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
  featured: Boolean(p.featured),
  duration: p.duration,
  ...toPricing(p),
});

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
  faqs: p.faqs,
  options: programOptions
    .filter((o) => o.parentSlug === p.slug)
    .map(({ slug, title, shortDescription }) => ({ slug, title, shortDescription })),
  parent: null,
});

function getProgram(slug) {
  const program = programs.find((p) => p.slug === slug);
  if (program) return toDetail(program);
  const option = programOptions.find((o) => o.slug === slug);
  if (!option) return null;
  const parent = programs.find((p) => p.slug === option.parentSlug);
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
}

const toSummary = ({ body: _body, ...post }) => post;
const sortedPosts = () => [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

function route(method, path, params) {
  let m;
  if (method === 'get' && path === '/programs') {
    const list = [...programs].sort((a, b) => a.order - b.order).map(toCard);
    return String(params.featured) === 'true' ? list.filter((p) => p.featured) : list;
  }
  if (method === 'get' && (m = path.match(/^\/programs\/([^/]+)$/))) {
    return SLUG.test(m[1]) ? getProgram(m[1]) : null;
  }
  if (method === 'get' && path === '/blog/categories') {
    const seen = new Map(blogPosts.map((p) => [p.category.slug, p.category]));
    return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (method === 'get' && path === '/blog/posts') {
    return sortedPosts()
      .filter((p) => !params.category || p.category.slug === params.category)
      .map(toSummary);
  }
  if (method === 'get' && (m = path.match(/^\/blog\/posts\/([^/]+)$/))) {
    return blogPosts.find((p) => p.slug === m[1]) ?? null;
  }
  if (method === 'get' && path === '/faqs') return homeFaqs;
  if (method === 'post' && path === '/contact') return { received: false, demo: true };
  if (method === 'post' && path === '/assessments') return { submitted: false, demo: true };
  return null;
}

export default async function demoAdapter(config) {
  const method = (config.method ?? 'get').toLowerCase();
  const path = decodeURIComponent(config.url ?? '').split('?')[0];
  const data = route(method, path, config.params ?? {});
  await new Promise((resolve) => setTimeout(resolve, 150)); // feel like a network call

  if (data === null) {
    const response = {
      data: { success: false, error: { code: 'NOT_FOUND', message: 'Not found' } },
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config,
    };
    throw new AxiosError('Not found', AxiosError.ERR_BAD_REQUEST, config, null, response);
  }
  return {
    data: { success: true, data },
    status: method === 'post' ? 201 : 200,
    statusText: 'OK',
    headers: {},
    config,
  };
}
