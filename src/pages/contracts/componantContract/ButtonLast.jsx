export function ButtonLast({ page, setPage, totalPages }) {
  return (
    <div className="mt-5 flex justify-between items-center">
      <div className="text-grayColor text-[0.9rem]">
        Page {page} of {totalPages}
      </div>
      <div className="flex gap-3 items-center">
        <button
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <button
          className="text-white bg-primaryColor border border-primaryColor px-3 pt-1 pb-2 rounded-md"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
