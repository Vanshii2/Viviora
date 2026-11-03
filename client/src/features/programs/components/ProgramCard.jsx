import MediaCard from '../../../components/common/MediaCard';

/** Program card used on Home and Programs — identical structure everywhere. */
export default function ProgramCard({ program }) {
  return (
    <MediaCard
      image={program.image}
      fallbackImage={program.fallbackImage}
      title={program.title}
      description={program.shortDescription}
      to={`/programs/${program.slug}`}
      ctaLabel="Explore Program"
    />
  );
}
