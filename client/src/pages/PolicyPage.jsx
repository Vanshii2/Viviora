import PageMeta from '../components/common/PageMeta';
import Section from '../components/common/Section';
import StateMessage from '../components/common/StateMessage';

/** Placeholder for legal pages until approved policy text is supplied. */
export default function PolicyPage({ title }) {
  return (
    <>
      <PageMeta title={title} />
      <Section narrow>
        <StateMessage
          titleAs="h1"
          title={title}
          description="This policy is being prepared and will be published here soon."
          action={{ to: '/contact' }}
          actionLabel="Questions? Contact us"
        />
      </Section>
    </>
  );
}
