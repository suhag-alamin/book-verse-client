import { SubmitHandler, useForm } from "react-hook-form";
import { useAddReviewMutation } from "../../redux/features/book/bookApi";

interface IProps {
  id: string | undefined;
}
type FormValues = {
  review: string;
  book: string | undefined;
};
const ReviewForm = ({ id }: IProps) => {
  const [addReview, { isLoading }] = useAddReviewMutation();

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.book = id;
    addReview(data);
  };
  return (
    <div className="max-w-xl text-center mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="w-full">
            <label htmlFor="hero-input" className="sr-only">
              Search
            </label>
            <input
              type="text"
              className="py-2 px-4 block w-full border border-bookVersePrimary shadow-sm rounded-md focus:z-10 focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
              placeholder="Write a review"
              {...register("review")}
            />
          </div>
          <button
            className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-bookVerseTertiary hover:border-bookVersePrimary border border-bookVerseTertiary text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-bookVersePrimary focus:ring-offset-2 focus:ring-offset-bookVersePrimary transition py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
