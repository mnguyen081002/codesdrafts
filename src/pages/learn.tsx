import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const BigCourseCard = () => {
  return (
    <Link href="/course" className="border-none">
      <div className=" mb-3 flex h-[350px] w-full flex-col justify-center rounded border border-gray-200 bg-white shadow-md transition duration-500 hover:-translate-y-4 hover:shadow-2xl lg:w-auto">
        <div className="flex h-[50%] flex-row justify-between border-b-2">
          <div className="flex flex-col justify-start gap-2 border-gray-300 py-4 px-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Course</p>
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
        <div className="flex h-[50%] flex-col gap-2 py-4 px-5">
          <span className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-600">
            5.Array and slice
          </span>
          <span className="text-base font-bold leading-6 text-black">
            Lesson 1 of 27 : Declaration and Initialization
          </span>
          <span className="text-sm">
            This lesson describes the important concepts of array, i.e., how to use, declare and
            initialize them.
          </span>
          <button className="w-44 rounded-[3px] bg-light-primary py-3 text-sm font-semibold text-white">
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
