import { useParams } from "react-router-dom";
import Review from "../components/Book/Review";
import Loading from "../components/Shared/Loading";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, isSuccess } = useGetSingleBookQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {!isLoading && isSuccess && data && (
        <div>
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
      {isError && (
        <div>
          <p className="text-red-500 text-center my-6">
            Something went wrong, try again later
          </p>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
