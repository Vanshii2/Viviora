import { useQuery } from '@tanstack/react-query';
import { faqService } from './faq.service';

export const useFaqs = (scope = 'home') =>
  useQuery({ queryKey: ['faqs', scope], queryFn: () => faqService.list(scope) });
