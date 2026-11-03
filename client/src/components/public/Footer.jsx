import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Logo from '../common/Logo';
import { mainNav, site } from '../../config/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" aria-label="Viviora home" className={styles.logoLink}>
              <Logo size="lg" />
            </Link>
            <p className={styles.description}>{site.description}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className={styles.groupTitle}>Quick Links</h2>
            <ul className={styles.list}>
              {mainNav.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
