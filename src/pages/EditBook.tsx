import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { ICustomError } from "../types/globalTypes";

interface IFormValues {
  title: string;
  description: string;
  image?: string;
  author: string;
  genre: string;
  publicationYear: string;
}

const EditBook = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data } = useGetSingleBookQuery(id);
  const [editBook, { isLoading, isError, isSuccess, error }] =
    useEditBookMutation();

  const { register, handleSubmit, setValue } = useForm<IFormValues>();

  useEffect(() => {
    if (data?.data) {
      setValue("title", data.data.title);
      setValue("description", data.data.description);
      setValue("image", data.data.image);
      setValue("genre", data.data.genre);
      setValue("publicationYear", data.data.publicationYear);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<IFormValues> = (updatedData) => {
    editBook({ id, updatedData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book updated successfully");
      navigate(`/books/${id}`);
    }
    if (isError) {
      toast.error((error as ICustomError)?.data?.message);
    }
  }, [isSuccess, isError, navigate, id, error]);

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="mt-7 bg-white border border-bookVersePrimary rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 ">
              Add a book
            </h1>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div className="w-full">
                  <label htmlFor="title" className="block text-sm mb-2 ">
                    Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                      placeholder="Book Title"
                      {...register("title", {})}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="genre" className="block text-sm mb-2 ">
                    Genre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="genre"
                      className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                      placeholder="Adventure"
                      {...register("genre", {})}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="publicationYear"
                    className="block text-sm mb-2 "
                  >
                    Publication Year
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="publicationYear"
                      className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                      placeholder="2023"
                      {...register("publicationYear", {})}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="image" className="block text-sm mb-2 ">
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="image"
                      className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                      placeholder="https://example.com/image.jpg"
                      {...register("image", {})}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="description" className="block text-sm mb-2 ">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      className=" py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                      placeholder="Book Description"
                      {...register("description", {})}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVersePrimary text-white hover:bg-bookVerseTertiary focus:outline-none focus:ring-2 focus:ring-bookVerseTertiary focus:ring-offset-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Edit Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
