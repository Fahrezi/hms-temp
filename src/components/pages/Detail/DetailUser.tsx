import Loading from '@/components/ui/Loading';

import useUserDetail from './useUserDetail';

import styles from './Detail.module.scss';

const DetailUser = () => {
  const { userData, isLoading, error } = useUserDetail();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div className={styles.notFound}>User not found</div>;
  }

  return (
    <div className={styles.userDetail}>
      <h1 onClick={() => window.history.back()}>{'<'} back</h1>
      <h1 className={styles.title}>User Details</h1>
      <div className={styles.card}>
        <div className={styles.field}>
          <span className={styles.label}>ID:</span>
          <span className={styles.value}>{userData.user_id}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{userData.email}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
