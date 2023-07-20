import { Link } from "react-router-dom";
import { IBook } from "../../types/globalTypes";

interface IBookCardProps {
  book: IBook;
}

const BookCard = ({ book }: IBookCardProps) => {
  return (
    <div>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl ">
        <img
          className="w-full max-h-72 rounded-t-xl"
          src={book?.image}
          alt={book?.title}
        />
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">{book?.title}</h3>
          <p className="text-sm text-gray-500 my-2">
            @{book?.author?.name.firstName + " " + book?.author?.name.lastName}
          </p>
          <p className="mt-1 text-bookVerseTertiary ">
            Publication Year: {book?.publicationYear}
          </p>
          <Link
            className="mt-3 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVerseTertiary text-white hover:bg-bookVersePrimary focus:outline-none focus:ring-2 focus:ring-bookVersePrimary focus:ring-offset-2 transition-all text-sm "
            to={`/books/${book?._id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
