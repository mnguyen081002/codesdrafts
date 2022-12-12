const BigCourseCard = () => {
  return (
    <div className="flex h-[400px] flex-col w-full rounded transition transform hover:-translate-y-4 shadow-md hover:shadow-2xl duration-500 mb-3 justify-center border border-gray-200 bg-white">
      <div className="flex flex-row justify-between h-[45%] border-b-2">
        <div className="flex flex-col justify-start py-4 px-5 gap-2 border-gray-300">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-600 dark:text-dark-contrastText">
            Course
          </p>
          <span className="text-2xl font-medium">The Way to Go</span>
        </div>
        <div className="flex flex-1 w-full justify-end p-4">
          <img
            src="https://www.educative.io/cdn-cgi/image/format=auto,width=350,quality=75/v2api/collection/10370001/6289391964127232/image/5627886733099008"
            alt=""
            className="h-full object-cover"
          />
        </div>
      </div>
      <div className="py-4 px-5 flex flex-col h-[55%] gap-2">
        <span className="text-xs font-bold tracking-widest uppercase mb-2 text-gray-600">
          5.Array and slice
        </span>
        <span className="text-base font-medium text-black">
          Lesson 1 of 27 : Declaration and Initialization
        </span>
        <span className="text-sm">
          This lesson describes the important concepts of array, i.e., how to use, declare and
          initialize them.
        </span>
        <button className="w-44 py-3 mt-2 mb-3 rounded-[3px] bg-light-primary text-white text-sm font-semibold">
          Continue Lesson
        </button>
      </div>
    </div>
  );
};

export default BigCourseCard;
