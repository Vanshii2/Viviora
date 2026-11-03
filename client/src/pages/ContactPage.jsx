import { useSearchParams } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import PageMeta from '../components/common/PageMeta';
import Section from '../components/common/Section';
import PageHero from '../components/public/PageHero';
import ContactForm from '../features/contact/ContactForm';
import { site } from '../config/site';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject') ?? '';
  const { email, phone, whatsapp } = site.contact;

  const methods = [
    email && { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    whatsapp && { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: whatsapp },
  ].filter(Boolean);

  return (
    <>
      <PageMeta
        title="Contact"
        description="Get in touch with Viviora to find the right nutrition program for you."
      />
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Have a question about our programs or not sure where to begin? Send us a note and we’ll help you find the right fit."
      />

      <Section aria-label="Contact">
        <div className={styles.layout}>
          <div className={styles.formCard}>
            <ContactForm key={subject} defaultSubject={subject} />
          </div>
          {methods.length > 0 && (
            <aside className={styles.aside}>
              <h2 className={styles.asideTitle}>Other ways to reach us</h2>
              <ul className={styles.methods}>
                {methods.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <Icon size={18} aria-hidden="true" />
                    <span>
                      <span className={styles.methodLabel}>{label}</span>
                      <a href={href} className={styles.methodValue}>
                        {value}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </Section>
    </>
  );
}
