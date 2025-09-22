import { useParams } from 'react-router-dom';

import { getUserById } from '@/services/user.service';

import type { User } from '@/types/user';

const useUserDetail = () => {
  const { user_id } = useParams<{ user_id: string }>();

  const { data, isLoading, error } = getUserById(parseInt(user_id || '0'));

  const userData: User | undefined = data?.data.user;

  return {
    userData,
    isLoading,
    error,
  };
};

export default useUserDetail;
