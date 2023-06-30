function CourseDetailSectionTitle({
  title,
  text,
  noUnderline,
  className,
}: {
  title: string;
  text: string;
  noUnderline?: boolean;
  className?: string;
}) {
  return (
    <div className={`w-full ${className || ''}`}>
      <div className="mb-3 w-full">
        <p className="mb-5 font-lexend-deca text-2xl font-medium leading-5 text-black">{title}</p>
        {noUnderline && <div className="h-[1px] w-full bg-light-border" />}
      </div>
      <p className="font-lexend-deca text-base font-light leading-8 text-light-text-course-detail-content">
        {text}
      </p>
    </div>
  );
}

function CourseDetailSection({
  title,
  text,
  contents,
}: {
  title: string;
  text: string;
  contents: string[];
}) {
  return (
    <div className="mb-7 flex w-full flex-col gap-7">
      <CourseDetailSectionTitle title={title} text={text}></CourseDetailSectionTitle>
      <div className=" grid grid-cols-2 gap-4">
        {contents.map((item, index) => (
          <div className="flex items-start gap-2" key={index}>
            <img className="mt-1" src="/images/course/bluecorrect.svg" alt="bluecorrect" />
            <p className="font-lexend-deca text-lg font-light text-light-text-course-detail-content">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CourseDetailSection, CourseDetailSectionTitle };
