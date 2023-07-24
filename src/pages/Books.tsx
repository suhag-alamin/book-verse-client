import { useEffect, useState } from "react";
import BookCard from "../components/Shared/BookCard";
import Pagination from "../components/Shared/Pagination";
import { useGetBooksWithPaginationQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";
import Loading from "../components/Shared/Loading";

const Books = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 9;

  const { data, isLoading, isError } = useGetBooksWithPaginationQuery({
    page,
    limit,
  });

  const [currentPage, setCurrentPage] = useState<number>(data?.meta?.page || 1);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-4 mt-8">
          {data?.data?.map((book: IBook) => (
            <div key={book?._id} className="col-span-4">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
      {isError && (
        <div>
          <p className="text-red-500 text-center my-6">
            Something went wrong, try again later
          </p>
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
