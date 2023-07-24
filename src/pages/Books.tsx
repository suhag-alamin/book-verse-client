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

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | null>
  >({});

  console.log(selectedOptions);

  const limit = 9;

  const { data, isLoading, isError } = useGetAllBooksQuery({
    page,
    limit,
    search,
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
          <div className="flex justify-between items-center gap-2 mg-12 lg:mb-20">
            <div className="w-full">
              <SearchBar setSearch={setSearch} />
            </div>
            <div className="w-full">
              <Filter setSelectedOptions={setSelectedOptions} />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-8">
            {data?.data?.map((book: IBook) => (
              <div key={book?._id} className="col-span-4">
                <BookCard book={book} />
              </div>
            ))}
          </div>
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
