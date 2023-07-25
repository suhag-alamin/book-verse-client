import { useGetReviewsQuery } from "../../redux/features/review/reviewApi";
import Loading from "../Shared/Loading";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
interface IProps {
  id: string | undefined;
}

const Review = ({ id }: IProps) => {
  const { data, isLoading } = useGetReviewsQuery(id);

  return (
    <div>
      <ReviewForm id={id} />
      {isLoading ? <Loading /> : <ReviewList reviews={data?.data} />}
    </div>
  );
};

export default Review;
