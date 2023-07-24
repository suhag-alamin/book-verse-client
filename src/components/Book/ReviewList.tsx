interface review {
  review: string;
  _id: string;
}

interface IProps {
  reviews: review[];
}

const ReviewList = ({ reviews }: IProps) => {
  return (
    <div>
      <h3 className="text-2xl my-4">Reviews:</h3>
      <ul className="pl-8">
        {reviews?.map((review) => (
          <li className="list-disc" key={review?._id}>
            <p>{review?.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
