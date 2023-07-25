import { useNavigate } from "react-router-dom";
import { useGetWishlistQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/globalTypes";
import Loading from "../Shared/Loading";

const WishlistTable = () => {
  const { data, isLoading } = useGetWishlistQuery(undefined);
  console.log(data?.data);

  const navigate = useNavigate();

  const handleViewBook = (id: string) => {
    navigate(`/books/${id}`);
  };

  // const handleDeleteBook = (id: string) => {
  //   // const confirmDelete = window.confirm(
  //   //   "Are you sure you want to delete this book?"
  //   // );
  //   // // if (confirmDelete) {
  //   // //   deleteBook(id);
  //   // // }
  // };

  // useEffect(() => {
  //   if (isDeleteSuccess) {
  //     toast.success("Book deleted successfully!");
  //     navigate("/dashboard");
  //   }
  //   if (isDeleteError) {
  //     toast.error((deleteError as ICustomError)?.data?.message);
  //   }
  // }, [isDeleteSuccess, isDeleteError, deleteError, navigate]);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col ">
          <div className="-m-1.5 overflow-x-auto ">
            <div className="p-1.5 min-w-full inline-block align-middle ">
              <div className="bg-white border px-2 lg:px-4 border-gray-200 rounded-xl shadow-sm overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Title
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Genre
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Publication Year
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 ">
                    {data?.data?.map((item: { book: IBook; user: object }) => (
                      <tr key={item.book?._id}>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <div className="grow">
                                <span className="block text-sm font-semibold text-gray-800 ">
                                  {item?.book?.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="block text-sm font-semibold text-gray-800 ">
                              {item?.book?.genre}
                            </span>
                          </div>
                        </td>

                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500">
                              {item?.book?.publicationYear}
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="flex gap-2 items-center justify-end">
                            <button
                              onClick={() => handleViewBook(item?.book?._id)}
                              className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-bookVersePrimary font-semibold hover:text-white focus:text-white hover:bg-bookVerseTertiary focus:outline-none focus:ring-2 focus:ring-bookVerseTertiary focus:ring-offset-2 transition-all text-sm"
                            >
                              View
                            </button>
                            <button
                              // onClick={() => handleDeleteBook(item?.book?._id)}
                              className="rounded-md bg-bookVerseRed px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bookVerseText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bookVerseText"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistTable;
