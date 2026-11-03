/** Per-page <title> and description (React 19 hoists these into <head>). */
export default function PageMeta({ title, description }) {
  const fullTitle = title ? `${title} | Viviora` : 'Viviora — Personalized Nutrition';
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
