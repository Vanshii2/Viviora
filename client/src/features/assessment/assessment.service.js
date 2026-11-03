/** Nutrition assessment API (POST /api/v1/assessments). */
import { apiClient } from '../../services/apiClient';

export const assessmentService = {
  submit: (payload) => apiClient.post('/assessments', payload),
};
