import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return Number(searchParams.get('page')) || 1;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = Number(searchParams.get('page'));

    if (!pageFromUrl || pageFromUrl !== page) {
      searchParams.set('page', page.toString());
      void navigate(`?${searchParams.toString()}`, { replace: true });
    }
  }, [page, location.search, navigate]);

  return { page, setPage };
};

export default usePagination;
