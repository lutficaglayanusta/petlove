import { type JSX } from 'react'

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element => {
  
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > maxVisible) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (pages[pages.length - 1] !== '...') {
          pages.push(i);
        } else {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - maxVisible) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded"
        aria-label="First page"
      >
        &#171;
      </button>

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded"
        aria-label="Previous page"
      >
        &#8249;
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`
            px-3 py-2 rounded
            ${page === '...'
              ? 'cursor-default'
              : page === currentPage
              ? 'bg-orange-400 text-white font-semibold'
              : 'hover:bg-gray-100'
            }
            disabled:cursor-not-allowed
          `}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded"
        aria-label="Next page"
      >
        &#8250;
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded"
        aria-label="Last page"
      >
        &#187;
      </button>
    </div>
  )
}

export default Pagination
