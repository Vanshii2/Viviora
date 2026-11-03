import PageMeta from '../components/common/PageMeta';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import PageHero from '../components/public/PageHero';
import {
  testimonials,
  transformations,
  videoTestimonials,
} from '../features/testimonials/testimonials.data';
import { cx } from '../utils/cx';
import styles from './TestimonialsPage.module.css';

export default function TestimonialsPage() {
  return (
    <>
      <PageMeta
        title="Testimonials"
        description="Stories from people who found nutrition that fits their body and lifestyle."
      />
      <PageHero eyebrow="Testimonials" title="Real Stories, Real Change" />

      <Section aria-label="Client reviews">
        <ul className={styles.grid}>
          {testimonials.map((t) => (
            <li key={t.id} className={cx(styles.card, t.placeholder && styles.placeholder)}>
              <blockquote className={styles.quote}>“{t.quote}”</blockquote>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.program}>{t.program}</p>
            </li>
          ))}
        </ul>
      </Section>

      {videoTestimonials.length > 0 && (
        <Section tone="soft" aria-labelledby="videos-title">
          <SectionHeading id="videos-title" title="Video Stories" />
          <ul className={styles.grid}>
            {videoTestimonials.map((v) => (
              <li key={v.id} className={styles.video}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {transformations.length > 0 && (
        <Section aria-labelledby="transformations-title">
          <SectionHeading id="transformations-title" title="Transformations" />
          {/* Rendered once consented before/after content exists. */}
        </Section>
      )}
    </>
  );
}
