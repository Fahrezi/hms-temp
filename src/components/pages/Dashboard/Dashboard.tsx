import { useNavigate } from 'react-router-dom';

import LazyImage from '@/components/ui/LazyImage';
import Loading from '@/components/ui/Loading';
import Pagination from '@/components/ui/Pagination';

import useDashboard from './useDashboard';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { usersData, totalPages, isFetching } = useDashboard();
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboard__title}>Dashboard</h1>
      <div className={styles.dashboard__content}>
        <div className={styles.dashboard__card}>
          <h2 className={styles['dashboard__card--heading']}>Welcome</h2>
          <p className={styles['dashboard__card--paragraph']}>This is your dashboard</p>
        </div>
      </div>
      <br />
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          {usersData.map((item, key) => (
            <h3
              onClick={() => {
                void navigate(`/detail/${item.user_id}`);
              }}
              key={key}
            >
              {item.email}
            </h3>
          ))}
          <br />
        </div>
      )}
      <br />
      <br />
      {usersData && <Pagination maxPage={totalPages} />}
      <LazyImage src='/images/hero.jpg' alt='hero' className={styles.dashboard__image} />
    </div>
  );
};

export default Dashboard;
