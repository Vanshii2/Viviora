import StateMessage from './StateMessage';
import styles from './QueryState.module.css';

/**
 * Renders loading / error states for a TanStack Query result, otherwise its children.
 *   <QueryState query={q} loading={<Skeleton/>}>…</QueryState>
 */
export default function QueryState({
  query,
  loading,
  errorTitle = 'Something went wrong',
  children,
}) {
  if (query.isPending) {
    return (
      loading ?? (
        <p className={styles.loading} role="status">
          Loading…
        </p>
      )
    );
  }
  if (query.isError) {
    return (
      <StateMessage
        role="alert"
        title={errorTitle}
        description={query.error?.message}
        action={{ onClick: () => query.refetch() }}
        actionLabel="Try again"
      />
    );
  }
  return children;
}
