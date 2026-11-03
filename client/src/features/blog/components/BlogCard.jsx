import MediaCard from '../../../components/common/MediaCard';
import { formatDate } from '../../../utils/format';

export default function BlogCard({ post }) {
  return (
    <MediaCard
      image={post.image}
      meta={`${post.category.name} · ${formatDate(post.publishedAt)}`}
      title={post.title}
      description={post.excerpt}
      to={`/blog/${post.slug}`}
      ctaLabel="Read More"
    />
  );
}
