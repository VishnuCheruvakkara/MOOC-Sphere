import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Pagination({
    currentPage,
    totalPages,
    loading,
    nextPage,
    previousPage,
    fetchCourses,
}) {
    return (
        <div className="mt-12 flex items-center justify-center gap-4">

            {/* Previous */}
            <button
                disabled={!previousPage || loading}
                onClick={() => {
                    if (previousPage && !loading) {
                        fetchCourses(previousPage);
                    }
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center border-2 border-deep-lavender-300 bg-butter-cream-100 text-deep-lavender-500 transition hover:bg-soft-lavender-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <FiChevronLeft size={20} />
            </button>

            {/* Page Info */}
            <div className="min-w-[100px] text-center text-sm font-semibold text-deep-lavender-500">
                Page {currentPage} of {totalPages}
            </div>

            {/* Next */}
            <button
                disabled={!nextPage || loading}
                onClick={() => {
                    if (nextPage && !loading) {
                        fetchCourses(nextPage);
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