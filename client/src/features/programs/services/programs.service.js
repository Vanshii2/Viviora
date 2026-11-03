/** Programs API (GET /api/v1/programs…). Pages use these through hooks, never directly. */
import { apiClient, getOrNull } from '../../../services/apiClient';

export const programsService = {
  listPrograms: () => apiClient.get('/programs'),
  listFeaturedPrograms: () => apiClient.get('/programs', { params: { featured: true } }),
  getProgram: (slug) => getOrNull(`/programs/${encodeURIComponent(slug)}`),
};
