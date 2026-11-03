import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Container from '../common/Container';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { mainNav } from '../../config/site';
import { cx } from '../../utils/cx';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector('a')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const linkClass = ({ isActive }) => cx(styles.link, isActive && styles.active);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Viviora home">
          <Logo />
        </Link>

        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.links}>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button to="/programs" size="sm" className={styles.cta}>
            Get Started
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        ref={drawerRef}
        className={cx(styles.drawer, isOpen && styles.drawerOpen)}
        hidden={!isOpen}
      >
        <nav aria-label="Mobile">
          <ul className={styles.drawerLinks}>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button to="/programs" fullWidth>
          Get Started
        </Button>
      </div>
    </header>
  );
}
