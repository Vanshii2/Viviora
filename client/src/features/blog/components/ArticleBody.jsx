import styles from './ArticleBody.module.css';

/** Renders structured article blocks. Unknown block types are ignored — never injects HTML. */
export default function ArticleBody({ blocks }) {
  return (
    <div className={styles.body}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={index}>{block.text}</h2>;
          case 'p':
            return <p key={index}>{block.text}</p>;
          case 'ul':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
