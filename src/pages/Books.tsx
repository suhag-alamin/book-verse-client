import { useEffect, useState } from "react";
import BookCard from "../components/Shared/BookCard";
import Pagination from "../components/Shared/Pagination";
import { useGetBooksWithPaginationQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";

const Books = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetBooksWithPaginationQuery(page);

  const [currentPage, setCurrentPage] = useState<number>(data?.meta?.page || 1);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center my-6">
          <div
            className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-bookVerseTertiary rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 mt-8">
          {data?.data?.map((book: IBook) => (
            <div key={book?._id} className="col-span-4">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}

      {data?.data?.length > 0 && (
        <div className="mt-8">
          <Pagination
            limit={data?.meta?.limit}
            total={data?.meta?.total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Books;
