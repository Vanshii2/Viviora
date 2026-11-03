import PageMeta from '../components/common/PageMeta';
import Section from '../components/common/Section';
import StateMessage from '../components/common/StateMessage';

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found" />
      <Section>
        <StateMessage
          titleAs="h1"
          title="Page not found"
          description="The page you’re looking for doesn’t exist or has moved."
          action={{ to: '/' }}
          actionLabel="Go home"
        />
      </Section>
    </>
  );
}
