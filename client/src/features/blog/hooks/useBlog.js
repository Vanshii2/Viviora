import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/blog.service';

export const useBlogCategories = () =>
  useQuery({ queryKey: ['blog-categories'], queryFn: () => blogService.listCategories() });

export const useBlogPosts = (filters = {}) =>
  useQuery({ queryKey: ['blog-posts', filters], queryFn: () => blogService.listPosts(filters) });

export const useBlogPost = (slug) =>
  useQuery({ queryKey: ['blog-posts', 'detail', slug], queryFn: () => blogService.getPost(slug) });
