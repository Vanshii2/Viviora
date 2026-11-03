import { Faq } from '../models/Faq.js';

export const faqService = {
  async list({ scope = 'home' } = {}) {
    const faqs = await Faq.find({ scope, isPublished: true }).sort({ order: 1 }).lean();
    return faqs.map(({ key, question, answer }) => ({ id: key, question, answer }));
  },
};
