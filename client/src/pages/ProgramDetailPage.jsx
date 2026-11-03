import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PageMeta from '../components/common/PageMeta';
import Container from '../components/common/Container';
import SmartImage from '../components/common/SmartImage';
import Button from '../components/common/Button';
import Accordion from '../components/common/Accordion';
import Section from '../components/common/Section';
import QueryState from '../components/common/QueryState';
import NotFoundPage from './NotFoundPage';
import { useProgram } from '../features/programs/hooks/usePrograms';
import PriceTag from '../features/programs/components/PriceTag';
import styles from './ProgramDetailPage.module.css';

function CheckList({ items }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li key={item}>
          <Check size={18} aria-hidden="true" className={styles.check} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailBlock({ title, children }) {
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const programQuery = useProgram(slug);
  const program = programQuery.data;

  if (programQuery.isPending || programQuery.isError) {
    return (
      <Section>
        <QueryState query={programQuery} errorTitle="We couldn’t load this program" />
      </Section>
    );
  }
  if (!program) return <NotFoundPage />;

  const back = program.parent
    ? { to: `/programs/${program.parent.slug}`, label: program.parent.title }
    : { to: '/programs', label: 'All programs' };
  const assessmentTo = `/nutrition-assessment?program=${encodeURIComponent(program.slug)}`;

  return (
    <>
      <PageMeta title={program.title} description={program.shortDescription} />

      {/* 1–2. Title and description */}
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroText}>
            <Link to={back.to} className={styles.back}>
              <ArrowLeft size={16} aria-hidden="true" />
              {back.label}
            </Link>
            <h1 className={styles.title}>{program.title}</h1>
            <p className={styles.description}>{program.description}</p>
            <Button to={assessmentTo} size="lg" withArrow className={styles.heroCta}>
              Start Your Assessment
            </Button>
          </div>
          <div className={styles.media}>
            <SmartImage
              src={program.image}
              fallbackSrc={program.fallbackImage}
              alt={`${program.title} program`}
              eager
            />
          </div>
        </Container>
      </section>

      <Container className={styles.body}>
        {/* 5, 7, 8. Duration, pricing, Get Started */}
        <aside className={styles.summary} aria-label="Program summary">
          <PriceTag
            size="lg"
            price={program.price}
            compareAtPrice={program.compareAtPrice}
            discountPercent={program.discountPercent}
          />
          <dl className={styles.facts}>
            <div>
              <dt>Duration</dt>
              <dd>{program.duration}</dd>
            </div>
          </dl>
          <Button to={assessmentTo} size="lg" withArrow fullWidth>
            Get Started
          </Button>
          <p className={styles.summaryNote}>
            You’ll start with a short nutrition assessment so your dietitian can understand your
            needs.
          </p>
        </aside>
        <div className={styles.main}>
          {/* 3. Who it is for */}
          <DetailBlock title="Who this program is for">
            <CheckList items={program.audience} />
          </DetailBlock>
          {/* 4. Benefits */}
          <DetailBlock title="Benefits">
            <CheckList items={program.benefits} />
          </DetailBlock>
          {/* 6. What is included */}
          <DetailBlock title="What is included">
            <CheckList items={program.included} />
          </DetailBlock>

          {program.options.length > 0 && (
            <DetailBlock title="Focused programs">
              <ul className={styles.options}>
                {program.options.map((option) => (
                  <li key={option.slug}>
                    <Link to={`/programs/${option.slug}`} className={styles.option}>
                      <span className={styles.optionTitle}>{option.title}</span>
                      <span className={styles.optionText}>{option.shortDescription}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DetailBlock>
          )}

          {/* 9. FAQ */}
          {program.faqs?.length > 0 && (
            <DetailBlock title="Frequently asked questions">
              <Accordion items={program.faqs} />
            </DetailBlock>
          )}
        </div>
      </Container>
    </>
  );
}
