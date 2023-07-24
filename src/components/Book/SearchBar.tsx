import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

type FormValues = {
  search: string;
};

const SearchBar = ({ setSearch }: IProps) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data?.search === "") {
      return toast.error("Please enter a search term");
    } else {
      setSearch(data?.search);
    }
  };

  return (
    <div className="">
      <div className="max-w-xl text-center mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div className="w-full">
              <label htmlFor="hero-input" className="sr-only">
                Search
              </label>
              <input
                type="search"
                className="py-2 px-4 block w-full border border-bookVersePrimary shadow-sm rounded-md focus:z-10 focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                placeholder="Search for books"
                {...register("search")}
              />
            </div>
            <button
              className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-bookVerseTertiary hover:border-bookVersePrimary border border-bookVerseTertiary text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-bookVersePrimary focus:ring-offset-2 focus:ring-offset-bookVersePrimary transition py-2 px-4 "
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
