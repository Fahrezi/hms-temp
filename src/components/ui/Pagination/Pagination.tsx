import usePagination from './usePagination';

type PaginationProps = {
  maxPage: number;
};

const Pagination = (props: PaginationProps) => {
  const { maxPage } = props;
  const { page, setPage } = usePagination();

  const handler = (action: string) => {
    setPage((prev) => {
      const newPage = action === 'next' ? prev + 1 : prev - 1;
      return newPage;
    });
  };

  return (
    <div>
      {page > 1 && <button onClick={() => handler('prev')}>PREV</button>}
      {page < maxPage && <button onClick={() => handler('next')}>NEXT</button>}
    </div>
  );
};

export default Pagination;
