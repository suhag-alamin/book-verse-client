import { useParams } from "react-router-dom";
import Review from "../components/Book/Review";
import Loading from "../components/Shared/Loading";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetSingleBookQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  const { data: book } = data;
  return (
    <div>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl ">
        <img
          className="w-full h-full rounded-t-xl"
          src={book?.image}
          alt={book?.title}
        />
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">{book?.title}</h3>
          <p className="text-sm text-gray-500 my-2">
            @{book?.author?.name.firstName + " " + book?.author?.name.lastName}
          </p>
          <p className="mt-1 text-bookVersePrimary ">Genre: {book?.genre}</p>
          <p className="mt-1 text-bookVerseTertiary ">
            Publication Year: {book?.publicationYear}
          </p>
          <p className="my-2 text-gray-800 ">{book?.description}</p>
        </div>
      </div>
      <div className="py-8">
        <Review id={id} />
      </div>
    </div>
  );
};

export default BookDetails;
