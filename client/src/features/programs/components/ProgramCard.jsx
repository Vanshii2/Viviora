import MediaCard from '../../../components/common/MediaCard';
import PriceTag from './PriceTag';

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
    >
      <PriceTag
        price={program.price}
        compareAtPrice={program.compareAtPrice}
        discountPercent={program.discountPercent}
      />
    </MediaCard>
  );
}
