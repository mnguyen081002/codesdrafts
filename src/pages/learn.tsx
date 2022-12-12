import Link from "next/link";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const BigCourseCard = () => {
  return (
    <Link href="/course" className="border-none">
      <div className="flex h-[350px] flex-col w-full lg:w-auto rounded transition transform hover:-translate-y-4 shadow-md hover:shadow-2xl duration-500 mb-3 justify-center border border-gray-200 dark:border-gray-A400 bg-white dark:bg-dark-80">
        <div className="flex flex-row justify-between h-[50%] border-b-2">
          <div className="flex flex-col justify-start py-4 px-5 gap-2 border-gray-300">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-600 dark:text-dark-contrastText">
              Course
            </p>
            <span className="text-2xl">The Way to Go</span>
          </div>
          <div>
            <img
              src="https://www.educative.io/cdn-cgi/image/format=auto,width=350,quality=75/v2api/collection/10370001/6289391964127232/image/5627886733099008"
              alt=""
              className="scale-75 object-cover"
            />
          </div>
        </div>
        <div className="py-4 px-5 flex flex-col h-[50%] gap-2">
          <span className="text-xs font-bold tracking-widest uppercase mb-2 text-gray-600 dark:text-dark-contrastText">
            5.Array and slice
          </span>
          <span className="text-base font-bold leading-6 text-black dark:text-dark-contrastText">
            Lesson 1 of 27 : Declaration and Initialization
          </span>
          <span className="text-sm">
            This lesson describes the important concepts of array, i.e., how to use, declare and
            initialize them.
          </span>
          <button className="w-44 py-3 rounded-[3px] bg-light-primary text-white text-sm font-semibold">
            Continue Lesson
          </button>
        </div>
      </div>
    </Link>
  );
};

const Index = () => {
  // const router = useRouter();

  return (
    <div>
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        <div className="flex justify-center">
          <div className="my-10 w-[80%]">
            <span>Continues Learning</span>
            <div className="grid grid-cols-2 gap-12">
              <BigCourseCard />
              <BigCourseCard />
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Index;
