import styles from './Setting.module.scss';

const Setting = () => {
  return (
    <div className={styles.settings}>
      <h1 className={styles.settings__title}>Settings</h1>
      <div className={styles.settings__content}>
        <div className={styles.settings__section}>
          <h2 className={styles['settings__section--heading']}>Preferences</h2>
          <div className={styles.settings__option}>
            <label className={styles['settings__option--label']}>
              <input type='checkbox' className={styles['settings__option--label--checkbox']} />
              <span className={styles['settings__option--label--text']}>Enable notifications</span>
            </label>
          </div>
          <div className={styles.settings__option}>
            <label className={styles['settings__option--label']}>
              <input type='checkbox' className={styles['settings__option--label--checkbox']} />
              <span className={styles['settings__option--label--text']}>Dark mode</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
