import React, { useState } from "react";

interface IProps {
  filterOptions: Record<string, string | null>;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >;
}

interface DropdownOption {
  label: string;
  options: string[];
}

const dropdownOptions: DropdownOption[] = [
  {
    label: "Genre",
    options: ["Action", "Drama", "Comedy", "Adventure"],
  },
  {
    label: "Publication Year",
    options: ["2021", "2022", "2023", "2024", "2025"],
  },
];

const Filter = ({ filterOptions, setFilterOptions }: IProps) => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const toggleGenreDropdown = () => {
    setIsGenreOpen((prevState) => !prevState);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen((prevState) => !prevState);
  };

  const handleOptionSelect = (label: string, option: string) => {
    setFilterOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [label]: option,
    }));

    if (label === "genre") {
      toggleGenreDropdown();
    } else if (label === "publicationYear") {
      toggleYearDropdown();
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4">
        <h3 className="">Filter by: </h3>
        <div className="relative inline-block">
          <button
            className="py-2 px-4 rounded-lg bg-bookVersePrimary text-white"
            onClick={toggleGenreDropdown}
          >
            {filterOptions.genre ? filterOptions.genre : "Genre"}
            <svg
              className={`w-4 h-4 inline-block ml-2 ${
                isGenreOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
          {isGenreOpen && (
            <div className="absolute z-10 mt-2 py-2 w-40 bg-white border rounded-lg shadow-lg">
              {dropdownOptions[0].options.map((option) => (
                <button
                  onClick={() => handleOptionSelect("genre", option)}
                  key={option}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Publication Year Dropdown */}
        <div className="relative inline-block">
          <button
            className="py-2 px-4 rounded-lg bg-bookVersePrimary text-white"
            onClick={toggleYearDropdown}
          >
            {filterOptions.publicationYear
              ? filterOptions.publicationYear
              : "Publication Year"}
            <svg
              className={`w-4 h-4 inline-block ml-2 ${
                isYearOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
          {isYearOpen && (
            <div className="absolute z-10 mt-2 py-2 w-40 bg-white border rounded-lg shadow-lg">
              {dropdownOptions[1].options.map((option) => (
                <button
                  onClick={() => handleOptionSelect("publicationYear", option)}
                  key={option}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
