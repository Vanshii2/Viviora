/** Shown only for the instant a lazily loaded page is fetched on first visit. */
export default function PageFallback() {
  return <div style={{ minHeight: '100vh' }} aria-busy="true" />;
}
