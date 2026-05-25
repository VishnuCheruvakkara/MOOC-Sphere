import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Pagination({
    page,
    totalPages,
    loading,
    nextPage,
    previousPage,
    setPage,
}) {
    return (
        <div className="mt-12 flex items-center justify-center gap-4">
            <button
                disabled={!previousPage || loading}
                onClick={() => {
                    if (previousPage && !loading) {
                        setPage((prev) => prev - 1);
                    }
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center border-2 border-deep-lavender-300 bg-butter-cream-100 text-deep-lavender-500 transition hover:bg-soft-lavender-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <FiChevronLeft size={20} />
            </button>

            <div className="min-w-[100px] text-center text-sm font-semibold text-deep-lavender-500">
                Page {page} of {totalPages}
            </div>

            <button
                disabled={!nextPage || loading}
                onClick={() => {
                    if (nextPage && !loading) {
                        setPage((prev) => prev + 1);
                    }
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center border-2 border-deep-lavender-300 bg-butter-cream-100 text-deep-lavender-500 transition hover:bg-soft-lavender-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <FiChevronRight size={20} />
            </button>
        </div>
    );
}

export default Pagination;