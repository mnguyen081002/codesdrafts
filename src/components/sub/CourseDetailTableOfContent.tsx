import { CourseDetailContentOfTable } from './CourseDetailContentOfTable';

interface CourseDetailTableOfContentProps {
  data: { title: string; contents: string[] }[];
}

const CourseDetailTableOfContent = ({ data }: CourseDetailTableOfContentProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {data.map((item, index) => (
        <CourseDetailContentOfTable key={index} contents={item.contents} title={item.title} />
      ))}
    </div>
  );
};

export default CourseDetailTableOfContent;
