import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageMeta from '../components/common/PageMeta';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SmartImage from '../components/common/SmartImage';
import QueryState from '../components/common/QueryState';
import NotFoundPage from './NotFoundPage';
import ArticleBody from '../features/blog/components/ArticleBody';
import { useBlogPost } from '../features/blog/hooks/useBlog';
import { formatDate } from '../utils/format';
import styles from './BlogPostPage.module.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const postQuery = useBlogPost(slug);
  const post = postQuery.data;

  if (postQuery.isPending || postQuery.isError) {
    return (
      <Section>
        <QueryState query={postQuery} errorTitle="We couldn’t load this article" />
      </Section>
    );
  }

  if (!post) return <NotFoundPage />;

  return (
    <>
      <PageMeta title={post.title} description={post.excerpt} />
      <article>
        <header className={styles.header}>
          <Container narrow>
            <Link to="/blog" className={styles.back}>
              <ArrowLeft size={16} aria-hidden="true" /> All articles
            </Link>
            <p className={styles.meta}>
              <Link to={`/blog?category=${post.category.slug}`}>{post.category.name}</Link>
              <span aria-hidden="true"> · </span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true"> · </span>
              {post.readingMinutes} min read
            </p>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>
          </Container>
        </header>
        <Container narrow>
          <div className={styles.cover}>
            <SmartImage src={post.image} alt="" eager />
          </div>
          <ArticleBody blocks={post.body} />
          <p className={styles.author}>Written by {post.author}</p>
        </Container>
      </article>
    </>
  );
}
