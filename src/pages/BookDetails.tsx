import { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoReaderOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Review from "../components/Book/Review";
import Loading from "../components/Shared/Loading";
import {
  useAddToWishlistMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook, ICustomError } from "../types/globalTypes";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, isSuccess } = useGetSingleBookQuery(id);

  const [
    deleteBook,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteBookMutation();

  const [
    addToWishList,
    {
      isLoading: isAddWishlistLoading,
      isSuccess: isAddWishlistSuccess,
      data: wishlistData,
    },
  ] = useAddToWishlistMutation();

  const { _id } = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleEditBook = () => {
    navigate(`/dashboard/edit-book/${id}`);
  };

  const handleDeleteBook = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      deleteBook(id);
    }
  };

  const handleAddToWishlist = (book: IBook) => {
    const data = {
      book: book._id,
      user: _id,
    };
    addToWishList(data);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Book deleted successfully!");
      navigate("/books");
    }
    if (isDeleteError) {
      toast.error((deleteError as ICustomError)?.data?.message);
    }
  }, [isDeleteSuccess, isDeleteError, deleteError, navigate]);

  useEffect(() => {
    if (isAddWishlistSuccess && wishlistData?.data === null) {
      toast.info("Book already added to wishlist!");
    }
    if (isAddWishlistSuccess && wishlistData?.data !== null) {
      toast.success("Book added to wishlist successfully!");
    }
  }, [isAddWishlistSuccess, wishlistData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {!isLoading && isSuccess && data?.data && (
        <div>
          <div className="flex justify-end items-center my-8 gap-4">
            <button
              onClick={() => handleEditBook()}
              className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-bookVersePrimary font-semibold hover:text-white focus:text-white hover:bg-bookVerseTertiary focus:outline-none focus:ring-2 focus:ring-bookVerseTertiary focus:ring-offset-2 transition-all text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteBook}
              className="rounded-md bg-bookVerseRed px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bookVerseText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bookVerseText"
            >
              Delete
            </button>
          </div>
          <div className="flex flex-col bg-white border shadow-sm rounded-xl ">
            <img
              className="w-full h-full rounded-t-xl"
              src={data?.data?.image}
              alt={data?.data?.title}
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800">
                {data?.data?.title}
              </h3>
              <p className="text-sm text-gray-500 my-2">
                @
                {data?.data?.author?.name.firstName +
                  " " +
                  data?.data?.author?.name.lastName}
              </p>
              <p className="mt-1 text-bookVersePrimary ">
                Genre: {data?.data?.genre}
              </p>
              <p className="mt-1 text-bookVerseTertiary ">
                Publication Year: {data?.data?.publicationYear}
              </p>
              <p className="my-2 text-gray-800 ">{data?.data?.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToWishlist(data?.data)}
                  title="Add to Wishlist"
                  className="mt-3 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVerseTertiary text-white hover:bg-bookVersePrimary focus:outline-none focus:ring-2 focus:ring-bookVersePrimary focus:ring-offset-2 transition-all text-x disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isAddWishlistLoading}
                >
                  <AiOutlineHeart />
                </button>

                <button
                  title="Add to Reading List"
                  className="mt-3 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVersePrimary text-white hover:bg-bookVerseTertiary focus:outline-none focus:ring-2 focus:ring-bookVerseTertiary focus:ring-offset-2 transition-all text-x  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoReaderOutline />
                </button>
              </div>
            </div>
          </div>
          <div className="py-8">
            <Review id={id} />
          </div>
        </div>
      )}
      {isError ||
        (!data?.data && (
          <div>
            <p className="text-red-500 text-center my-6">
              Something went wrong, try again later
            </p>
          </div>
        ))}
    </div>
  );
};

export default BookDetails;
