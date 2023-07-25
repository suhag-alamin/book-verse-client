import ReadingListTable from "../components/ReadingList/ReadingListTable";

const ReadingList = () => {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Reading List
          </h1>
        </div>
      </header>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto">
        <ReadingListTable />
      </div>
    </div>
  );
};

export default ReadingList;
