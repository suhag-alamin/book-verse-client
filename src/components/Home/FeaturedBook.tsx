import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/globalTypes";
import BookCard from "../Shared/BookCard";

const FeaturedBook = () => {
  const limit = 10;
  const { data, isLoading } = useGetBooksQuery(limit);

  return (
    <div className="py-8">
      <div className="text-center">
        <h3 className="text-4xl mb-2">Featured Book</h3>
        <p className="text-gray-500">
          Check out our featured book of the month! It's a great read and you
          can get it for free!
        </p>
      </div>

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
      </div>
      <div className="my-8 text-center">
        <Link
          to="/books"
          className="rounded-md bg-bookVersePrimary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bookVerseTertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bookVerseTertiary"
        >
          View all books
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBook;
