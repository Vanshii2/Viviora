import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/HomePage';
import PageFallback from '../components/common/PageFallback';

// Home ships in the main bundle; other pages load on demand to keep first paint fast.
const page = (loader) => async () => ({ Component: (await loader()).default });

export const router = createBrowserRouter(
  [
    {
      element: <PublicLayout />,
      HydrateFallback: PageFallback,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/about', lazy: page(() => import('../pages/AboutPage')) },
        { path: '/programs', lazy: page(() => import('../pages/ProgramsPage')) },
        { path: '/programs/:slug', lazy: page(() => import('../pages/ProgramDetailPage')) },
        { path: '/blog', lazy: page(() => import('../pages/BlogPage')) },
        { path: '/blog/:slug', lazy: page(() => import('../pages/BlogPostPage')) },
        { path: '/testimonials', lazy: page(() => import('../pages/TestimonialsPage')) },
        { path: '/contact', lazy: page(() => import('../pages/ContactPage')) },
        {
          path: '/nutrition-assessment',
          lazy: page(() => import('../pages/NutritionAssessmentPage')),
        },
        {
          path: '/terms',
          lazy: async () => {
            const { default: PolicyPage } = await import('../pages/PolicyPage');
            return { element: <PolicyPage title="Terms & Conditions" /> };
          },
        },
        {
          path: '/privacy',
          lazy: async () => {
            const { default: PolicyPage } = await import('../pages/PolicyPage');
            return { element: <PolicyPage title="Privacy Policy" /> };
          },
        },
        { path: '*', lazy: page(() => import('../pages/NotFoundPage')) },
      ],
    },
    // Later: /dashboard/* (DashboardLayout), /admin/* (AdminLayout)
  ],
  {
    // Supports hosting under a sub-path, e.g. GitHub Pages at /Viviora/
    basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
  },
);
