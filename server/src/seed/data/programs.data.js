/**
 * Program seed data — loaded into MongoDB by `npm run seed -w server`.
 * The database is the source of truth at runtime; this file is the starting content
 * (an admin panel will manage it in a later phase).
 *
 * Structure
 *   programs        The 7 main programs. Each has a detail page at /programs/:slug.
 *   programOptions  Focused variations stored inside their parent program (e.g. "IBS Support" in Gut Health).
 *
 * DRAFT CONTENT: durations, audience, benefits and inclusions are draft copy for review.
 * Images live in client/public/images/programs/<slug>.jpg.
 */

/**
 * PRICING — the single place to set program prices (in rupees, for the full program duration).
 *   price           what the client pays
 *   compareAtPrice  regular price shown struck through; the discount is calculated from it.
 *                   Only show a regular price you genuinely charge — set it to null to hide the discount.
 * Set `price: null` to show "Pricing coming soon".
 */
export const PROGRAM_PRICING = {
  'gut-health': { price: 2499, compareAtPrice: 3499 },
  'weight-loss': { price: 2799, compareAtPrice: 3999 },
  'muscle-building': { price: 2499, compareAtPrice: 3499 },
  'womens-health': { price: 2699, compareAtPrice: 3799 },
  'lifestyle-disorders': { price: 2999, compareAtPrice: 4199 },
  'kids-nutrition': { price: 1999, compareAtPrice: 2799 },
  'sports-nutrition': { price: 2799, compareAtPrice: 3799 },
};

const img = (slug) => `/images/programs/${slug}.jpg`;

const sharedIncluded = [
  'Initial one-on-one consultation',
  'Personalized nutrition plan',
  'Regular follow-ups and plan adjustments',
  'Recipes and practical meal ideas',
  'Support for your questions between sessions',
];

const sharedFaqs = [
  {
    id: 'personalized',
    question: 'Is the plan personalized for me?',
    answer:
      'Yes. Your plan is built around your goals, routine, food preferences and any health information you share.',
  },
  {
    id: 'vegetarian',
    question: 'Do you offer vegetarian plans?',
    answer: 'Yes. Plans can be vegetarian, eggetarian or non-vegetarian based on your preference.',
  },
  {
    id: 'medical',
    question: 'Will this replace my doctor’s advice?',
    answer:
      'No. Nutrition guidance supports — but never replaces — medical care. Please continue any treatment advised by your doctor.',
  },
];

const programRows = [
  {
    slug: 'gut-health',
    title: 'Gut Health',
    shortDescription:
      'Support digestion and build healthier daily habits with personalized nutrition.',
    description:
      'A personalized approach to calmer, more comfortable digestion. Together we look at what you eat, when you eat and how your body responds — then build a routine your gut can rely on.',
    featured: true,
    duration: '12 weeks',
    audience: [
      'People who experience frequent bloating, acidity or irregular digestion',
      'Anyone wanting a calmer, more predictable gut through everyday food choices',
      'Those who have tried generic diets without lasting relief',
    ],
    benefits: [
      'A meal pattern built around foods your gut tolerates well',
      'Gradual, sustainable changes instead of strict elimination',
      'Better awareness of personal food triggers',
      'Support with hydration, fibre and mindful-eating habits',
    ],
  },
  {
    slug: 'weight-loss',
    title: 'Weight Loss',
    shortDescription: 'Build sustainable eating habits that support your weight management goals.',
    description:
      'Steady, sustainable weight management without crash diets. Your plan fits your routine, your food preferences and the occasions in your life — so the results can last.',
    featured: true,
    duration: '12 weeks',
    audience: [
      'Anyone looking for steady, sustainable fat loss',
      'People who want results without crash diets or skipped meals',
      'Busy professionals who need a plan that fits real routines',
    ],
    benefits: [
      'Balanced meals that keep you full and energised',
      'Portion guidance tailored to your goals and activity',
      'Habits designed to help you maintain results',
      'Flexible options for eating out and social occasions',
    ],
  },
  {
    slug: 'muscle-building',
    title: 'Muscle Building',
    shortDescription:
      'Fuel your body with balanced nutrition designed to support strength and recovery.',
    description:
      'Nutrition planned around your training — enough protein and energy, at the right times, from food you enjoy — to support strength, performance and recovery.',
    featured: true,
    duration: '12 weeks',
    audience: [
      'Gym-goers and home trainers looking to build lean muscle',
      'Anyone wanting to improve strength and recovery through food',
      'Vegetarians who want to meet protein needs with a food-first approach',
    ],
    benefits: [
      'Protein and energy intake planned around your training',
      'Pre- and post-workout meal guidance',
      'Food-first recovery support',
      'Adjustments as your training load changes',
    ],
  },
  {
    slug: 'womens-health',
    title: "Women's Health",
    shortDescription: 'Nutrition that supports hormonal balance and wellbeing at every life stage.',
    description:
      'Personalized nutrition for PCOS, thyroid, hormonal changes, perimenopause and menopause — designed to complement the care you receive from your doctor.',
    duration: '12 weeks',
    audience: [
      'Women managing PCOS, thyroid or hormonal changes',
      'Women going through perimenopause or menopause',
      'Anyone wanting nutrition that respects each life stage',
    ],
    benefits: [
      'Meals designed to support steady energy and mood',
      'Nutrition that complements, not replaces, medical care',
      'Practical habits for cycle and life-stage changes',
      'Guidance on key nutrients for women’s health',
    ],
  },
  {
    slug: 'lifestyle-disorders',
    title: 'Lifestyle Disorders',
    shortDescription:
      'Nutrition and lifestyle support alongside your care for diabetes, cholesterol, fatty liver and blood pressure.',
    description:
      'Structured, realistic changes to how you eat and live, aligned with your doctor’s guidance and reviewed as your health reports change.',
    duration: '16 weeks',
    audience: [
      'People managing diabetes, cholesterol, fatty liver or high blood pressure',
      'Anyone advised by their doctor to improve diet and lifestyle',
      'Those wanting structured, realistic changes they can keep',
    ],
    benefits: [
      'Meal plans aligned with your doctor’s guidance',
      'Smarter choices for carbohydrates, fats and salt',
      'Habits that support long-term health',
      'Regular reviews as your reports change',
    ],
  },
  {
    slug: 'kids-nutrition',
    title: 'Kids Nutrition',
    shortDescription: 'Balanced, age-appropriate nutrition to support healthy growth.',
    description:
      'Kid-friendly meals and positive food habits for growing children — practical for busy families and enjoyable for the whole table.',
    duration: '8 weeks',
    audience: [
      'Parents wanting balanced, age-appropriate meals for their children',
      'Families dealing with picky eating',
      'Active kids who need extra fuel for sport and growth',
    ],
    benefits: [
      'Kid-friendly meals the whole family can enjoy',
      'Guidance on growth-supporting nutrients',
      'Ideas for school lunch boxes and snacks',
      'Positive, pressure-free food habits',
    ],
  },
  {
    slug: 'sports-nutrition',
    title: 'Sports Nutrition',
    shortDescription:
      'Fuel training, recovery and competition with nutrition built around your sport.',
    description:
      'Energy, hydration and recovery planned around your training schedule and competition calendar, for on- and off-season.',
    duration: '12 weeks',
    audience: [
      'Athletes training regularly for a sport',
      'Young athletes and their parents',
      'Anyone preparing for a competition season',
    ],
    benefits: [
      'Energy and hydration planned around training sessions',
      'Competition-day and travel nutrition guidance',
      'Food-first recovery strategies',
      'Plans that adapt to on- and off-season needs',
    ],
  },
];

export const programs = programRows.map((program, index) => ({
  id: `prg-${index + 1}`,
  ...program,
  category: program.title,
  featured: Boolean(program.featured),
  image: img(program.slug),
  included: sharedIncluded,
  price: PROGRAM_PRICING[program.slug]?.price ?? null,
  compareAtPrice: PROGRAM_PRICING[program.slug]?.compareAtPrice ?? null,
  faqs: sharedFaqs,
  order: index + 1,
}));

// [slug, title, parentSlug, shortDescription]
const optionRows = [
  [
    'gut-reset-program',
    'Gut Reset Program',
    'gut-health',
    'A structured reset to calm your digestion and rebuild healthy eating patterns.',
  ],
  [
    'gut-balance-routine',
    'Gut Balance Routine',
    'gut-health',
    'Everyday food habits that keep your gut comfortable and consistent.',
  ],
  [
    'ibs-support',
    'IBS Support',
    'gut-health',
    'Gentle, personalized nutrition support for living more comfortably with IBS.',
  ],
  [
    'constipation-support',
    'Constipation Support',
    'gut-health',
    'Fibre, fluids and routine — balanced to support regular digestion.',
  ],
  [
    'acidity-relief',
    'Acidity Relief',
    'gut-health',
    'Meal timing and food choices that help reduce acidity and discomfort.',
  ],
  [
    'bloating-relief',
    'Bloating Relief',
    'gut-health',
    'Identify triggers and build meals that leave you feeling lighter.',
  ],

  [
    'wedding-weight-loss',
    'Wedding Weight Loss',
    'weight-loss',
    'A focused, healthy plan to feel your best before the big day.',
  ],
  [
    'fat-loss-program',
    'Fat Loss Program',
    'weight-loss',
    'Steady, sustainable fat loss without crash dieting.',
  ],
  [
    'belly-fat-reduction',
    'Belly Fat Reduction',
    'weight-loss',
    'Nutrition and habits that support reducing stubborn abdominal fat.',
  ],
  [
    'pcos-weight-loss',
    'PCOS Weight Loss',
    'weight-loss',
    'Weight management designed around the needs of PCOS.',
  ],
  [
    'post-pregnancy-weight-loss',
    'Post Pregnancy Weight Loss',
    'weight-loss',
    'Gentle, nourishing weight loss that respects postpartum recovery.',
  ],

  [
    'lean-muscle-gain',
    'Lean Muscle Gain',
    'muscle-building',
    'Build quality muscle with the right protein, energy and timing.',
  ],
  [
    'gym-nutrition',
    'Gym Nutrition',
    'muscle-building',
    'Nutrition that fuels your gym sessions and recovery.',
  ],
  [
    'home-workout-nutrition',
    'Home Workout Nutrition',
    'muscle-building',
    'Practical plans to support training at home.',
  ],
  [
    'abs-nutrition',
    'Abs Nutrition',
    'muscle-building',
    'Lean out and support core definition with smart nutrition.',
  ],
  [
    'strength-building',
    'Strength Building',
    'muscle-building',
    'Fuel progressive strength training and better performance.',
  ],

  [
    'pcos',
    'PCOS',
    'womens-health',
    'Personalized nutrition to support hormonal balance with PCOS.',
  ],
  [
    'thyroid',
    'Thyroid',
    'womens-health',
    'Food choices that support energy and wellbeing alongside thyroid care.',
  ],
  [
    'hormonal-balance',
    'Hormonal Balance',
    'womens-health',
    'Balanced meals and routines that support hormonal health.',
  ],
  [
    'perimenopause',
    'Perimenopause',
    'womens-health',
    'Nutrition support for the changes of perimenopause.',
  ],
  [
    'menopause',
    'Menopause',
    'womens-health',
    'Support bone health, energy and wellbeing through menopause.',
  ],

  [
    'diabetes-nutrition',
    'Diabetes Nutrition',
    'lifestyle-disorders',
    'Meal planning that supports steadier blood sugar alongside medical care.',
  ],
  [
    'cholesterol-management',
    'Cholesterol Management',
    'lifestyle-disorders',
    'Heart-friendly eating to support healthier cholesterol levels.',
  ],
  [
    'fatty-liver',
    'Fatty Liver',
    'lifestyle-disorders',
    'Nutrition and lifestyle changes that support liver health.',
  ],
  [
    'high-blood-pressure',
    'High Blood Pressure',
    'lifestyle-disorders',
    'Lower-salt, balanced eating that supports healthy blood pressure.',
  ],

  [
    'healthy-growth',
    'Healthy Growth',
    'kids-nutrition',
    'Balanced, age-appropriate nutrition for growing children.',
  ],
  [
    'immunity',
    'Immunity',
    'kids-nutrition',
    'Everyday foods that support a child’s natural immunity.',
  ],
  [
    'kids-sports-nutrition',
    'Sports Nutrition for Kids',
    'kids-nutrition',
    'Fuel for active kids who play sport.',
  ],

  [
    'swimming-nutrition',
    'Swimming Nutrition',
    'sports-nutrition',
    'Energy and recovery planning for swimmers.',
  ],
  [
    'gymnastics-nutrition',
    'Gymnastics Nutrition',
    'sports-nutrition',
    'Nutrition for strength, flexibility and healthy growth in gymnastics.',
  ],
  [
    'martial-arts-nutrition',
    'Martial Arts Nutrition',
    'sports-nutrition',
    'Fuel for training, weight-class awareness and recovery.',
  ],
  [
    'athlete-nutrition',
    'Athlete Nutrition',
    'sports-nutrition',
    'Comprehensive performance nutrition for competitive athletes.',
  ],
];

export const programOptions = optionRows.map(([slug, title, parentSlug, shortDescription]) => ({
  slug,
  title,
  parentSlug,
  shortDescription,
}));
