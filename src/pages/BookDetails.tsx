import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetSingleBookQuery(id);
  const { data: book } = data;
  console.log(data);
  return <div>{book?.title}</div>;
};

export default BookDetails;
