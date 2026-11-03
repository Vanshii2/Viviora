import PageMeta from '../components/common/PageMeta';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SmartImage from '../components/common/SmartImage';
import { aboutContent as about } from '../features/about/about.data';
import { cx } from '../utils/cx';
import styles from './AboutPage.module.css';

function Eyebrow({ children }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

/** Simple name/detail text list. Placeholder entries render visibly provisional. */
function TextList({ items }) {
  return (
    <ul className={styles.textList}>
      {items.map((item) => (
        <li key={item.title} className={cx(item.placeholder && styles.placeholder)}>
          <span className={styles.itemTitle}>{item.title}</span>
          <span className={styles.itemMeta}>{item.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const academic = about.academic.entries.map((e) => ({ ...e, detail: e.institution }));

  return (
    <>
      <PageMeta
        title="About"
        description="Meet Vinni Kapoor Sharma and the philosophy behind Viviora: your body is unique, and your nutrition should be too."
      />

      {/* 1. My Story */}
      <section className={styles.storySection} aria-labelledby="story-title">
        <Container className={styles.story}>
          <div className="fade-up">
            <Eyebrow>{about.story.eyebrow}</Eyebrow>
            <h1 id="story-title" className={styles.h1}>
              {about.story.title}
            </h1>
            {about.story.paragraphs.map((p) => (
              <p key={p} className={styles.body}>
                {p}
              </p>
            ))}
          </div>
          <div className={styles.portrait}>
            <SmartImage src={about.story.image} alt={about.story.imageAlt} eager />
          </div>
        </Container>
      </section>

      {/* 2. Academic Background + 3. Qualifications */}
      <Section tone="soft" compact aria-label="Academic background and qualifications">
        <div className={styles.credentials}>
          <div>
            <Eyebrow>Academic Background</Eyebrow>
            <h2 className={styles.name}>{about.academic.name}</h2>
            <TextList items={academic} />
          </div>
          <div>
            <Eyebrow>Qualifications</Eyebrow>
            <h2 className={styles.h2}>Qualifications</h2>
            <TextList items={about.qualifications} />
          </div>
        </div>
      </Section>

      {/* 4. Certifications */}
      <Section aria-labelledby="certifications-title">
        <Eyebrow>Certifications</Eyebrow>
        <h2 id="certifications-title" className={styles.h2}>
          Certifications
        </h2>
        <p className={cx(styles.body, styles.lead)}>{about.certifications.description}</p>
        <ul className={styles.certGrid}>
          {about.certifications.items.map((cert) => (
            <li
              key={cert.title}
              className={cx(styles.cert, cert.placeholder && styles.placeholder)}
            >
              <span className={styles.itemTitle}>{cert.title}</span>
              <span className={styles.itemMeta}>{cert.issuer}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Mission + 6. Vision */}
      <Section tone="soft" aria-label="Mission and vision">
        <div className={styles.missionVision}>
          <div>
            <Eyebrow>Mission</Eyebrow>
            <h2 className={styles.h3}>Our Mission</h2>
            <p className={styles.body}>{about.mission}</p>
          </div>
          <div>
            <Eyebrow>Vision</Eyebrow>
            <h2 className={styles.h3}>Our Vision</h2>
            <p className={styles.body}>{about.vision}</p>
          </div>
        </div>
      </Section>

      {/* Our Philosophy — kept at the owner's request */}
      <Section narrow aria-labelledby="philosophy-title">
        <div className={styles.philosophy}>
          <Eyebrow>Our Philosophy</Eyebrow>
          <h2 id="philosophy-title" className={styles.h2}>
            {about.philosophy.title}
          </h2>
          {about.philosophy.paragraphs.map((p) => (
            <p key={p} className={styles.body}>
              {p}
            </p>
          ))}
          <p className={styles.closing}>{about.philosophy.closing}</p>
        </div>
      </Section>
    </>
  );
}
