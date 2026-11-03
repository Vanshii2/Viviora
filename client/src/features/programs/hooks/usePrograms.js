import { useQuery } from '@tanstack/react-query';
import { programsService } from '../services/programs.service';

export const programKeys = {
  all: ['programs'],
  featured: ['programs', 'featured'],
  detail: (slug) => ['programs', 'detail', slug],
};

export const usePrograms = () =>
  useQuery({ queryKey: programKeys.all, queryFn: () => programsService.listPrograms() });

export const useFeaturedPrograms = () =>
  useQuery({
    queryKey: programKeys.featured,
    queryFn: () => programsService.listFeaturedPrograms(),
  });

export const useProgram = (slug) =>
  useQuery({ queryKey: programKeys.detail(slug), queryFn: () => programsService.getProgram(slug) });
