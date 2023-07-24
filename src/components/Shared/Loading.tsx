const Loading = () => {
  return (
    <div className="flex justify-center my-6">
      <div
        className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-bookVerseTertiary rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
