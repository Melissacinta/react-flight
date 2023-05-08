export default function Pagination({
  length,
  page,
  handlePageChange,
  start,
  end,
}: {
  length: number;
  page: number;
  start: number;
  end: number;
  handlePageChange: (x: string) => void;
}) {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 font-serif"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium mr-1">{start}</span>
          {start !== end && (
            <>
              to <span className="font-medium mr-1">{end}</span>
            </>
          )}
          <span className="font-medium">of {length}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={page === 0}
          onClick={() => handlePageChange('prev')}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange('next')}
          disabled={page + 1 === Math.ceil(length / 10)}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
