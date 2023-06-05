import Button from '../common/Button';

const HomeLayout = () => {
  return (
    <>
      <div>
        <span>Continues Learning</span>
        <div className="w-full items-center">
          <div className="grid grid-cols-2 gap-12">
            {/* {continueLearningCoures.map((item, index) => {
              return index < 2 ? null : item;
            })} */}
          </div>
        </div>
        {/**
         * TODO: Add a button to show more
         */}
      </div>
      <div className="my-5">
        <p>Recommended For You</p>
        <div className="my-6 flex flex-row justify-center gap-6">
          {/* {recommendedCourses.map((item) => item)} */}
        </div>
        {/**
         * TODO: Add a button to show more
         */}
        <div className="flex justify-end">
          <Button text="Show more" />
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
