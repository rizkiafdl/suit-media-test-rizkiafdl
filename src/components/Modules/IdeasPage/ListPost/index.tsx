// IdeasList.tsx
import React from 'react';
import ListCard from '@/components/Modules/IdeasPage/ListCard';
import useIdeas from '@/utils/UseIdeas';

const IdeasList: React.FC = () => {
  const {
    ideas,
    isLoading,
    totalPages,
    pageNumber,
    pageSize,
    sortBy,
    setPageSize,
    setSortBy,
    handleNextPage,
    handlePrevPage,
  } = useIdeas();

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPageSize(Number(e.target.value));

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <span className="text-sm text-gray-600">
          Page {pageNumber} - {pageSize} of total {totalPages}
        </span>
        <div className='flex flex-col sm:flex-row gap-4'>
          <label className="text-sm flex items-center">
            Show per page:
            <select
              className="ml-2 border rounded-md px-3 py-1.5 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={pageSize}
              onChange={handlePageSizeChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>

          <label className="text-sm flex items-center">
            Sort by:
            <select
              className="ml-2 border rounded-md px-3 py-1.5 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={sortBy}
              onChange={handleSortChange}>
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          [...Array(pageSize)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse bg-gray-200 rounded-lg aspect-[3/4]"
            />
          ))
        ) : ideas.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No ideas found</p>
          </div>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea.id}
              className="transition-all duration-300 hover:-translate-y-1"
            >
              <ListCard data={idea} />
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
          className={`px-4 py-2 rounded-md transition-colors duration-200
            ${pageNumber === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {pageNumber}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IdeasList;