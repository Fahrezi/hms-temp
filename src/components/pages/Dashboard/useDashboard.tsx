import { useLocation } from 'react-router-dom';

import { getUsers } from '@/services/user.service';

import { User, UsersResponse } from '@/types/user';

const useDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageFromUrl: number = Number(searchParams.get('page'));

  const { data, isFetching } = getUsers(pageFromUrl);

  const responseDataUser: UsersResponse | undefined = data?.data;
  const usersData: User[] = responseDataUser?.data ?? [];
  const totalPages: number = responseDataUser?.total_pages ?? 0;

  return {
    usersData,
    totalPages,
    isFetching,
  };
};

export default useDashboard;
