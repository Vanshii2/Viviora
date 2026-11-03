import PageMeta from '../components/common/PageMeta';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import CardGrid from '../components/common/CardGrid';
import Button from '../components/common/Button';
import Accordion from '../components/common/Accordion';
import QueryState from '../components/common/QueryState';
import CardSkeletons from '../components/common/CardSkeletons';
import PageHero from '../components/public/PageHero';
import CtaBanner from '../components/public/CtaBanner';
import ProgramCard from '../features/programs/components/ProgramCard';
import { useFeaturedPrograms } from '../features/programs/hooks/usePrograms';
import { useFaqs } from '../features/faq/useFaqs';

export default function HomePage() {
  const featuredQuery = useFeaturedPrograms();
  const faqQuery = useFaqs('home');

  return (
    <>
      <PageMeta description="Personalized nutrition for your body, your goals and your lifestyle. Explore Viviora's nutrition programs." />

      {/* Hero */}
      <PageHero
        size="lg"
        eyebrow="Nutrition & Wellness"
        title={
          <>
            Your Body Is <span className="text-highlight">Unique</span>.
            <br />
            Your <span className="text-highlight">Nutrition</span> Should Be Too.
          </>
        }
        description="Personalized nutrition for your body, your goals, and your lifestyle."
        actions={
          <>
            <Button to="/programs" size="lg" withArrow>
              Explore Programs
            </Button>
            <Button to="/about" size="lg" variant="outline">
              Learn About Us
            </Button>
          </>
        }
        image="/images/home/hero.jpg"
        imageAlt="A table of fresh, colourful healthy dishes"
      />

      {/* Nutrition Solutions — exactly three featured programs */}
      <Section aria-labelledby="solutions-title">
        <SectionHeading id="solutions-title" title="Nutrition Solutions" />
        <QueryState
          query={featuredQuery}
          loading={<CardSkeletons count={3} />}
          errorTitle="We couldn’t load our programs"
        >
          <CardGrid>
            {featuredQuery.data?.map((program) => (
              <li key={program.slug}>
                <ProgramCard program={program} />
              </li>
            ))}
          </CardGrid>
        </QueryState>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="soft" aria-labelledby="faq-title">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently Asked Questions" />
        <QueryState query={faqQuery} errorTitle="We couldn’t load the FAQs">
          <Accordion items={faqQuery.data ?? []} columns={2} />
        </QueryState>
      </Section>

      {/* Final CTA */}
      <CtaBanner />
    </>
  );
}
