/**
 * Blog seed data — loaded into MongoDB by `npm run seed -w server`.
 * Article bodies are structured blocks (never raw HTML) so they render safely.
 * DRAFT articles for layout review; replace with real articles before launch.
 */
export const blogCategories = [
  { slug: 'gut-health', name: 'Gut Health' },
  { slug: 'healthy-eating', name: 'Healthy Eating' },
  { slug: 'weight-management', name: 'Weight Management' },
  { slug: 'lifestyle', name: 'Lifestyle' },
];

const cat = (slug) => blogCategories.find((c) => c.slug === slug);

export const blogPosts = [
  {
    slug: 'why-no-single-diet-works-for-everyone',
    title: 'Why No Single Diet Works for Everyone',
    excerpt:
      'Your body, routine and preferences are unique. Here is why personalized nutrition tends to last longer than one-size-fits-all plans.',
    category: cat('healthy-eating'),
    author: 'Viviora Team',
    publishedAt: '2026-10-20',
    readingMinutes: 4,
    image: '/images/blog/personalized-nutrition.jpg',
    body: [
      {
        type: 'p',
        text: 'Most diets are designed for an average person who does not really exist. Two people of the same age and weight can have very different routines, food cultures, activity levels and health histories.',
      },
      { type: 'h2', text: 'What makes nutrition personal' },
      {
        type: 'ul',
        items: [
          'Your daily routine and work schedule',
          'Your food preferences and cultural habits',
          'Your activity level and training',
          'Health conditions and any advice from your doctor',
        ],
      },
      {
        type: 'p',
        text: 'A plan that respects these factors is easier to follow — and a plan you can follow is the one that works.',
      },
      { type: 'h2', text: 'Start small' },
      {
        type: 'p',
        text: 'Sustainable change rarely comes from overnight overhauls. Small, consistent adjustments add up over weeks and months.',
      },
    ],
  },
  {
    slug: 'simple-habits-for-better-digestion',
    title: 'Simple Habits for Better Digestion',
    excerpt:
      'Everyday habits — from meal timing to mindful eating — that can make your gut feel calmer.',
    category: cat('gut-health'),
    author: 'Viviora Team',
    publishedAt: '2026-10-08',
    readingMinutes: 3,
    image: '/images/blog/digestion-habits.jpg',
    body: [
      {
        type: 'p',
        text: 'Digestion is influenced not only by what you eat, but by how and when you eat it.',
      },
      { type: 'h2', text: 'Habits worth trying' },
      {
        type: 'ul',
        items: [
          'Eat at fairly regular times',
          'Slow down and chew well',
          'Drink water through the day',
          'Include a variety of fibre-rich foods gradually',
        ],
      },
      {
        type: 'p',
        text: 'If digestive symptoms are persistent or severe, please consult a doctor.',
      },
    ],
  },
  {
    slug: 'building-a-balanced-plate',
    title: 'Building a Balanced Plate',
    excerpt: 'A practical, flexible way to put together meals that keep you full and energised.',
    category: cat('weight-management'),
    author: 'Viviora Team',
    publishedAt: '2026-09-25',
    readingMinutes: 3,
    image: '/images/blog/balanced-plate.jpg',
    body: [
      { type: 'p', text: 'A balanced plate is a simple visual guide rather than a strict rule.' },
      { type: 'h2', text: 'A simple starting point' },
      {
        type: 'ul',
        items: [
          'Half the plate: vegetables',
          'A quarter: protein such as dal, paneer, eggs or legumes',
          'A quarter: whole grains or other complex carbohydrates',
          'A small portion of healthy fats',
        ],
      },
      {
        type: 'p',
        text: 'Your exact proportions depend on your goals and activity — which is where personalization helps.',
      },
    ],
  },
  {
    slug: 'sleep-stress-and-nutrition',
    title: 'Sleep, Stress and Nutrition',
    excerpt:
      'How rest and stress shape appetite, cravings and energy — and what you can do about it.',
    category: cat('lifestyle'),
    author: 'Viviora Team',
    publishedAt: '2026-09-12',
    readingMinutes: 4,
    image: '/images/blog/sleep-stress.jpg',
    body: [
      {
        type: 'p',
        text: 'Nutrition does not exist in isolation. Sleep and stress affect hunger, cravings and how energised you feel.',
      },
      { type: 'h2', text: 'Small supports' },
      {
        type: 'ul',
        items: [
          'Keep a consistent sleep window',
          'Avoid very heavy meals close to bedtime',
          'Plan snacks for high-stress days',
          'Make time for movement you enjoy',
        ],
      },
    ],
  },
];
