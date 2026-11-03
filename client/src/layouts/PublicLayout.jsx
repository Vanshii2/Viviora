import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import styles from './PublicLayout.module.css';

/** Scrolls to the top on navigation, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash, search } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, search]);
  return null;
}

export default function PublicLayout() {
  return (
    <div className={styles.shell}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
