/** FAQ API (GET /api/v1/faqs). */
import { apiClient } from '../../services/apiClient';

export const faqService = {
  list: (scope = 'home') => apiClient.get('/faqs', { params: { scope } }),
};
