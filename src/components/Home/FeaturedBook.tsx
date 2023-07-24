import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/globalTypes";
import BookCard from "../Shared/BookCard";
import Loading from "../Shared/Loading";

const FeaturedBook = () => {
  const limit = 10;
  const { data, isLoading, isError } = useGetBooksQuery(limit);

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
          <Loading />
        ) : (
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
        )}
        {isError && (
          <div>
            <p className="text-red-500 text-center my-6">
              Something went wrong, try again later
            </p>
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
