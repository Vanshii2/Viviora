import { Link, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/common/PageMeta';
import Section from '../components/common/Section';
import CardGrid from '../components/common/CardGrid';
import StateMessage from '../components/common/StateMessage';
import QueryState from '../components/common/QueryState';
import CardSkeletons from '../components/common/CardSkeletons';
import PageHero from '../components/public/PageHero';
import BlogCard from '../features/blog/components/BlogCard';
import { useBlogCategories, useBlogPosts } from '../features/blog/hooks/useBlog';
import { cx } from '../utils/cx';
import styles from './BlogPage.module.css';

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const active = searchParams.get('category') ?? '';
  const { data: categories = [] } = useBlogCategories();
  const postsQuery = useBlogPosts({ category: active || undefined });
  const posts = postsQuery.data ?? [];

  const filters = [{ slug: '', name: 'All' }, ...categories];

  return (
    <>
      <PageMeta
        title="Blog"
        description="Practical nutrition and wellness articles from Viviora."
      />
      <PageHero eyebrow="Blog" title="Nutrition, Simplified" />

      <Section compact aria-label="Articles">
        <nav aria-label="Blog categories" className={styles.filters}>
          {filters.map((category) => (
            <Link
              key={category.slug || 'all'}
              to={category.slug ? `/blog?category=${category.slug}` : '/blog'}
              className={cx(styles.chip, active === category.slug && styles.chipActive)}
              aria-current={active === category.slug ? 'page' : undefined}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <QueryState
          query={postsQuery}
          loading={<CardSkeletons count={3} />}
          errorTitle="We couldn’t load articles"
        >
          {posts.length === 0 ? (
            <StateMessage
              title="No articles yet"
              description="New articles in this category are coming soon."
            />
          ) : (
            <CardGrid>
              {posts.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} />
                </li>
              ))}
            </CardGrid>
          )}
        </QueryState>
      </Section>
    </>
  );
}
