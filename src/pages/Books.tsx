import { useEffect, useState } from "react";
import Filter from "../components/Book/Filter";
import SearchBar from "../components/Book/SearchBar";
import BookCard from "../components/Shared/BookCard";
import Loading from "../components/Shared/Loading";
import Pagination from "../components/Shared/Pagination";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";

const Books = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [filterOptions, setFilterOptions] = useState<
    Record<string, string | null>
  >({});

  const limit = 9;

  const { data, isLoading, isError } = useGetAllBooksQuery({
    page,
    limit,
    search,
    ...filterOptions,
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
        <div>
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center mg-12 lg:mb-20">
            <div className="w-full">
              <SearchBar setSearch={setSearch} />
            </div>
            <div className="w-full">
              <Filter
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-8">
            {data?.data?.map((book: IBook) => (
              <div
                key={book?._id}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!isLoading && data?.data?.length === 0 && (
        <div>
          <p className="text-center text-bookVerseRed text-2xl mt-12">
            No books found
          </p>
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
