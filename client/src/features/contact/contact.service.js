/** Contact API (POST /api/v1/contact). */
import { apiClient } from '../../services/apiClient';

export const contactService = {
  submit: (payload) => apiClient.post('/contact', payload),
};
