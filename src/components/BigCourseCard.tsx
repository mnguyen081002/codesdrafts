const BigCourseCard = () => {
  return (
    <div className="mb-3 flex h-[400px] w-full flex-col justify-center rounded border border-gray-200 bg-white shadow-md transition duration-500 hover:-translate-y-4 hover:shadow-2xl">
      <div className="flex h-[45%] flex-row justify-between border-b-2">
        <div className="flex flex-col justify-start gap-2 border-gray-300 py-4 px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Course</p>
          <span className="text-2xl font-medium">The Way to Go</span>
        </div>
        <div className="flex w-full flex-1 justify-end p-4">
          <img
            src="https://www.educative.io/cdn-cgi/image/format=auto,width=350,quality=75/v2api/collection/10370001/6289391964127232/image/5627886733099008"
            alt=""
            className="h-full object-cover"
          />
        </div>
      </div>
      <div className="flex h-[55%] flex-col gap-2 py-4 px-5">
        <span className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-600">
          5.Array and slice
        </span>
        <span className="text-base font-medium text-black">
          Lesson 1 of 27 : Declaration and Initialization
        </span>
        <span className="text-sm">
          This lesson describes the important concepts of array, i.e., how to use, declare and
          initialize them.
        </span>
        <button className="mt-2 mb-3 w-44 rounded-[3px] bg-light-primary py-3 text-sm font-semibold text-white">
          Continue Lesson
        </button>
      </div>
    </div>
  );
};

export default BigCourseCard;
