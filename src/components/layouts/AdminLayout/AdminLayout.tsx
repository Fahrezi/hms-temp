import { Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <button onClick={logout} className={styles.layout__header__button}>
          Log Out
        </button>
      </header>

      <main className={styles.layout__main}>
        <Outlet />
      </main>

      <footer className={styles.layout__footer}>{/* Add your footer content */}</footer>
    </div>
  );
};

export default AdminLayout;
