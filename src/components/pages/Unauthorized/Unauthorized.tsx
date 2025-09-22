import { Link } from 'react-router-dom';

import styles from './Unauthorized.module.scss';

const Unauthorized = () => {
  return (
    <div className={styles['unauthorized']}>
      <div className={styles['unauthorized__container']}>
        <h1 className={styles['unauthorized__title']}>403 - Unauthorized</h1>
        <p className={styles['unauthorized__message']}>You do not have permission to access this page.</p>
        <Link to='/' className={styles['unauthorized__link']}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
