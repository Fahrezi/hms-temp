import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Pagination from '@/components/ui/Pagination';

const mockSetPage = vi.fn();
let currentPage = 1;

vi.mock('@/components/ui/Pagination/usePagination', () => {
  return {
    default: () => ({
      page: currentPage,
      setPage: mockSetPage,
    }),
  };
});

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentPage = 1;
  });

  it('should render with no buttons when on page 1 of 1', () => {
    currentPage = 1;

    const { container } = render(<Pagination maxPage={1} />);

    expect(screen.queryByText('PREV')).not.toBeInTheDocument();
    expect(screen.queryByText('NEXT')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should only show NEXT button on first page', () => {
    currentPage = 1;

    render(<Pagination maxPage={3} />);

    expect(screen.queryByText('PREV')).not.toBeInTheDocument();
    expect(screen.getByText('NEXT')).toBeInTheDocument();
  });

  it('should show both buttons on middle page', () => {
    currentPage = 2;

    render(<Pagination maxPage={3} />);

    expect(screen.getByText('PREV')).toBeInTheDocument();
    expect(screen.getByText('NEXT')).toBeInTheDocument();
  });

  it('should only show PREV button on last page', () => {
    currentPage = 3;

    render(<Pagination maxPage={3} />);

    expect(screen.getByText('PREV')).toBeInTheDocument();
    expect(screen.queryByText('NEXT')).not.toBeInTheDocument();
  });

  it('should call setPage with next page when NEXT is clicked', () => {
    currentPage = 1;

    render(<Pagination maxPage={3} />);

    fireEvent.click(screen.getByText('NEXT'));

    expect(mockSetPage).toHaveBeenCalled();

    const setPageCallback = mockSetPage.mock.calls[0][0];

    const result = setPageCallback(1);

    expect(result).toBe(2);
  });

  it('should call setPage with previous page when PREV is clicked', () => {
    currentPage = 2;

    render(<Pagination maxPage={3} />);
    fireEvent.click(screen.getByText('PREV'));

    expect(mockSetPage).toHaveBeenCalled();

    const setPageCallback = mockSetPage.mock.calls[0][0];

    const result = setPageCallback(2);

    expect(result).toBe(1);
  });
});
