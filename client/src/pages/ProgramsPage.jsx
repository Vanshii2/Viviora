import { Navigate, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/common/PageMeta';
import Section from '../components/common/Section';
import CardGrid from '../components/common/CardGrid';
import QueryState from '../components/common/QueryState';
import CardSkeletons from '../components/common/CardSkeletons';
import PageHero from '../components/public/PageHero';
import ProgramCard from '../features/programs/components/ProgramCard';
import { usePrograms } from '../features/programs/hooks/usePrograms';

export default function ProgramsPage() {
  const [searchParams] = useSearchParams();
  const programsQuery = usePrograms();

  // Backwards compatibility with Phase 1 links (/programs?category=gut-health).
  const legacyCategory = searchParams.get('category');
  if (legacyCategory) return <Navigate to={`/programs/${legacyCategory}`} replace />;

  return (
    <>
      <PageMeta
        title="Programs"
        description="Personalized nutrition programs for gut health, weight loss, muscle building, women's health, lifestyle disorders, kids and sports nutrition."
      />
      <PageHero
        eyebrow="Our programs"
        title="Explore Our Programs"
        description="Personalized nutrition programs designed around your body, your goals and your lifestyle."
        image="/images/programs/hero.jpg"
        imageAlt="A nourishing bowl of salmon, greens, egg and vegetables"
      />
      <Section aria-label="All programs">
        <QueryState
          query={programsQuery}
          loading={<CardSkeletons count={6} />}
          errorTitle="We couldn’t load our programs"
        >
          <CardGrid>
            {programsQuery.data?.map((program) => (
              <li key={program.slug}>
                <ProgramCard program={program} />
              </li>
            ))}
          </CardGrid>
        </QueryState>
      </Section>
    </>
  );
}
