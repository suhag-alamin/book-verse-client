import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetSingleBookQuery(id);
  console.log(data);
  return <div>BookDetails</div>;
};

export default BookDetails;
