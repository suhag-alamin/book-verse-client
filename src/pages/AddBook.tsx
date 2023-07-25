import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";

interface IFormValues {
  title: string;
  description: string;
  image?: string;
  author: string;
  genre: string;
  publicationYear: string;
}

const AddBook = () => {
  const { _id } = useAppSelector((state) => state.auth.user);

  const [addBook, { isSuccess, isError, isLoading }] = useAddBookMutation();

  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    if (_id) {
      data.author = _id;
      addBook(data);
    } else {
      toast.error("Please login to add a book");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book added successfully");
      navigate("/books");
    }
    if (isError) {
      toast.error("Something went wrong, try again later");
    }
  }, [isSuccess, isError, navigate]);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add Book
          </h1>
        </div>
      </header>
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
                        required
                        {...register("title", {
                          required: true,
                        })}
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
                        required
                        {...register("genre", {
                          required: true,
                        })}
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
                        required
                        {...register("publicationYear", {
                          required: true,
                        })}
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
                    <label
                      htmlFor="description"
                      className="block text-sm mb-2 "
                    >
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        id="description"
                        className=" py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                        placeholder="Book Description"
                        required
                        {...register("description", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVersePrimary text-white hover:bg-bookVerseTertiary focus:outline-none focus:ring-2 focus:ring-bookVerseTertiary focus:ring-offset-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
