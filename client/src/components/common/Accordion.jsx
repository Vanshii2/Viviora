import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cx } from '../../utils/cx';
import styles from './Accordion.module.css';

function AccordionItem({ item, isOpen, onToggle, headingLevel: Heading }) {
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={cx(styles.item, isOpen && styles.open)}>
      <Heading className={styles.heading}>
        <button
          id={buttonId}
          type="button"
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <Plus className={styles.icon} size={18} aria-hidden="true" />
        </button>
      </Heading>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.panel}
        hidden={!isOpen}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

/** Accessible accordion. items: [{ id, question, answer }]. columns: 1 | 2 */
export default function Accordion({ items, columns = 1, headingLevel = 'h3' }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  const groups =
    columns === 2
      ? [items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))]
      : [items];

  return (
    <div className={cx(styles.accordion, columns === 2 && styles.twoColumns)}>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.column}>
          {group.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              headingLevel={headingLevel}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
