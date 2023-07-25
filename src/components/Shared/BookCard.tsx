import { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoReaderOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddToReadingListMutation,
  useAddToWishlistMutation,
} from "../../redux/features/book/bookApi";
import { useAppSelector } from "../../redux/hook";
import { IBook } from "../../types/globalTypes";

interface IBookCardProps {
  book: IBook;
}

const BookCard = ({ book }: IBookCardProps) => {
  // get user id
  const { _id } = useAppSelector((state) => state.auth.user);

  // add to wishlist
  const [
    addToWishList,
    {
      isLoading: isAddWishlistLoading,
      isSuccess: isAddWishlistSuccess,
      data: wishlistData,
    },
  ] = useAddToWishlistMutation();

  // add to reading list
  const [
    addToReadingList,
    {
      isLoading: isAddReadingListLoading,
      isSuccess: isAddReadingListSuccess,
      data: readingListData,
    },
  ] = useAddToReadingListMutation();

  // handle add to wishlist
  const handleAddToWishlist = (book: IBook) => {
    const data = {
      book: book._id,
      user: _id,
    };
    addToWishList(data);
  };

  // handle add to reading list
  const handleAddToReadingList = (book: IBook) => {
    const data = {
      book: book._id,
      user: _id,
    };
    addToReadingList(data);
  };

  // add to wishlist toast
  useEffect(() => {
    if (isAddWishlistSuccess && wishlistData?.data === null) {
      toast.info("Book already added to wishlist!", {
        toastId: "wishlist",
      });
    }
    if (isAddWishlistSuccess && wishlistData?.data !== null) {
      toast.success("Book added to wishlist successfully!", {
        toastId: "wishlist",
      });
    }
  }, [isAddWishlistSuccess, wishlistData]);

  // add to reading list toast
  useEffect(() => {
    if (isAddReadingListSuccess && readingListData?.data === null) {
      toast.info("Book already added to Reading List!", {
        toastId: "wishlist",
      });
    }
    if (isAddReadingListSuccess && readingListData?.data !== null) {
      toast.success("Book added to Reading List successfully!", {
        toastId: "wishlist",
      });
    }
  }, [isAddReadingListSuccess, readingListData]);

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
          <p className="my-2 text-gray-800 ">
            {book?.description.slice(0, 100)}...
          </p>
          <div className="flex justify-between items-center">
            <Link
              className="mt-3 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVerseTertiary text-white hover:bg-bookVersePrimary focus:outline-none focus:ring-2 focus:ring-bookVersePrimary focus:ring-offset-2 transition-all text-sm "
              to={`/books/${book?._id}`}
            >
              Details
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToWishlist(book)}
                title="Add to Wishlist"
                className="mt-3 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVerseTertiary text-white hover:bg-bookVersePrimary focus:outline-none focus:ring-2 focus:ring-bookVersePrimary focus:ring-offset-2 transition-all text-x disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAddWishlistLoading}
              >
                <AiOutlineHeart />
              </button>
              <button
                onClick={() => handleAddToReadingList(book)}
                title="Add to Reading List"
                className="mt-3 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVersePrimary text-white hover:bg-bookVerseTertiary focus:outline-none focus:ring-2 focus:ring-bookVerseTertiary focus:ring-offset-2 transition-all text-x disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAddReadingListLoading}
              >
                <IoReaderOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
