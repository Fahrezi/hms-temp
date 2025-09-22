import type React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const TITLE_DIGIT_CLASS = 'not_found__title-digit';

const NotFound: React.FC = () => {
  return (
    <div className={styles.not_found}>
      <div className={styles.not_found__container}>
        <h1 className={styles.not_found__title}>
          <span className={styles[TITLE_DIGIT_CLASS]}>4</span>
          <span className={styles[TITLE_DIGIT_CLASS]}>0</span>
          <span className={styles[TITLE_DIGIT_CLASS]}>4</span>
        </h1>

        <div className={styles.not_found__astronaut}>
          <div className={styles['not_found__astronaut-body']}></div>
          <div className={styles['not_found__astronaut-head']}></div>
          <div className={styles['not_found__astronaut-arm-left']}></div>
          <div className={styles['not_found__astronaut-arm-right']}></div>
          <div className={styles['not_found__astronaut-leg-left']}></div>
          <div className={styles['not_found__astronaut-leg-right']}></div>
        </div>

        <div className={styles.not_found__stars}></div>

        <div className={styles.not_found__message}>
          <h2 className={styles['not_found__message-title']}>Page Not Found</h2>
          <p className={styles['not_found__message-text']}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to='/' className={styles['not_found__message-button']}>
            Return to Dashobard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
