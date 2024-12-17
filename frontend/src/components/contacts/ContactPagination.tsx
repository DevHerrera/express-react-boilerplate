import React from "react";
import { AppDispatch } from "../../redux/store.ts";

interface ContactPaginationProps {
  dispatch: AppDispatch;
  currentPage: number;
  totalPages: number;
}

export const ContactPagination = ({
  dispatch,
  currentPage,
  totalPages,
}: ContactPaginationProps) => {
  return (
    <section className="flex justify-center items-center gap-4 mt-4 p-4 ">
      <div className="flex justify-center items-center gap-4 p-6 bg-slate-100 rounded">
        <button
          onClick={() =>
            dispatch({ type: "contacts/setPage", payload: currentPage - 1 })
          }
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm font-medium text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() =>
            dispatch({ type: "contacts/setPage", payload: currentPage + 1 })
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </section>
  );
};
