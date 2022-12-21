import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useRouter } from "next/router";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
const Course = (props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Main meta={<Meta title={id!.toString()} description="Lorem ipsum" />}>
      <div className="flex mt-10 w-full justify-center">
        <div className="w-[50%]">
          <div className="flex justify-start py-5 h-60">
            <div className="w-[50%] px-10 h-full">
              <div className="bg-gradient-to-bl from-sky-100 to-blue-400 rounded-normal flex justify-center h-full items-center">
                <div className="rounded-lg bg-white p-2">
                  <WallpaperIcon style={{ fontSize: "30px" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <span className="font-semibold">Course Authors:</span>
              <div className="flex justify-start">
                <img src="/logo-96.png" className="h-5 mr-2" alt="" />
                <span>Code Smooth</span>
              </div>
            </div>
          </div>
          <div>
            <input type="text" placeholder="Give a name to your course" className="rounded-normal text-base h-20 pl-8 bg-white placeholder-slate-500 border border-slate-400" />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Course;
