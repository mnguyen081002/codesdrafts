const CourseSkeleton = () => {
  return (
    <div className="w-[50%] animate-pulse">
      <div className="flex h-60 justify-start py-5">
        <div className="mx-10 h-full w-[50%] bg-slate-200"></div>
        <div className="h-full w-[50%] flex-col justify-between">
          <div className="h-10 w-full bg-slate-200"></div>
          <div className="mt-10 h-10 w-full bg-slate-200"></div>
          <div className="mt-10 h-10 w-full bg-slate-200"></div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-10">
        <div className="h-10 w-full bg-slate-200"></div>
        <div className="h-10 w-full bg-slate-200"></div>
        <div className="h-10 w-full bg-slate-200"></div>
        <div className="h-10 w-full bg-slate-200"></div>
        <div className="h-10 w-full bg-slate-200"></div>
        <div className="h-10 w-full bg-slate-200"></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
