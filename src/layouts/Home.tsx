import Button from "../common/Button";
import BigCourseCard from "../components/BigCourseCard";
import SmallCourseCard from "../components/SmallCourseCard";

const HomeLayout = () => {
  const continueLearningCoures = [
    <BigCourseCard />,
    <BigCourseCard />,
    <BigCourseCard />,
    <BigCourseCard />,
    <BigCourseCard />,
    <BigCourseCard />,
  ];

  const recommendedCourses = [
    <SmallCourseCard />,
    <SmallCourseCard />,
    <SmallCourseCard />,
    <SmallCourseCard />,
  ];
  return (
    <>
      <div>
        <span>Continues Learning</span>
        <div className="w-full items-center">
          <div className="grid grid-cols-2 gap-12">
            {continueLearningCoures.map((item,index) => {
              return index < 2 ? null : item;
            })}
          </div>
        </div>
        {/**
         * TODO: Add a button to show more
         */}
      </div>
      <div className="my-5">
        <p>Recommended For You</p>
        <div className="flex flex-row gap-6 justify-center my-6">
          {recommendedCourses.map((item) => item)}
        </div>
        {/**
         * TODO: Add a button to show more
         */}
        <div className="flex justify-end">
          <Button text="Show more"/>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
