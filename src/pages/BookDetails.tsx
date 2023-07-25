import { useNavigate, useParams } from "react-router-dom";
import Review from "../components/Book/Review";
import Loading from "../components/Shared/Loading";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ICustomError } from "../types/globalTypes";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, isSuccess } = useGetSingleBookQuery(id);

  const [
    deleteBook,
    { isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteBookMutation();

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

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Book deleted successfully!");
      navigate("/books");
    }
    if (isDeleteError) {
      toast.error((deleteError as ICustomError)?.data?.message);
    }
  }, [isDeleteSuccess, isDeleteError, deleteError, navigate]);

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
