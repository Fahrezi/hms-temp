import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={styles.profile}>
      <h1 className={styles.profile__title}>Profile</h1>
      <div className={styles.profile__content}>
        <div className={styles.profile__card}>
          <div className={styles.profile__info}>
            <h2 className={styles['profile__info--heading']}>Personal Information</h2>
            <div className={styles.profile__field}>
              <label htmlFor='name' className={styles['profile__field--label']}>
                Name
              </label>
              <input id='name' type='text' placeholder='John Doe' className={styles['profile__field--input']} />
            </div>
            <div className={styles.profile__field}>
              <label htmlFor='email' className={styles['profile__field--label']}>
                Email
              </label>
              <input
                id='email'
                type='email'
                placeholder='john@example.com'
                className={styles['profile__field--input']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
