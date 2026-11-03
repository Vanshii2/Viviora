/**
 * Site-wide configuration.
 * Contact details and social URLs are intentionally empty until real values are supplied —
 * components hide anything that is not configured (README §4: do not invent contact details).
 */
export const site = {
  name: 'Viviora',
  tagline: 'Nutrition. Wellness. You.',
  description: 'Helping you build healthier habits through personalized nutrition and wellness.',
  nutritionist: 'Vinni Kapoor Sharma',

  contact: {
    email: '', // e.g. 'hello@viviora.in'
    phone: '', // e.g. '+91 90000 00000'
    whatsapp: '', // full wa.me link
    address: '',
  },

  // Add entries only for accounts that exist: { label: 'Instagram', href: 'https://…' }
  social: [],
};

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'Programs', to: '/programs' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];
