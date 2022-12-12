import Button from "../common/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { WidthProgressBar } from "../utils/AppConfig";
const SmallCourseCard = () => {
  return (
    <div className="flex h-[380px] flex-col w-72 rounded transition transform hover:-translate-y-2 shadow-md hover:shadow-lg duration-500 mb-3 justify-center border border-gray-200 bg-white">
      <img
        src="https://www.educative.io/cdn-cgi/image/format=auto,width=350,quality=75/v2api/collection/10370001/6289391964127232/image/5627886733099008"
        className="flex flex-row justify-between h-[40%] border-b-2"
      />
      <div className="flex flex-col h-[30%] px-3 py-4 gap-2">
        <div className="flex justify-start items-center gap-2">
          <img src="./logo-96.png" alt="avatar" className="h-6 w-6 rounded-full" />
          <p className="text-sm">Code Smooth</p>
        </div>
        <p className="font-medium text-">The Way to GO</p>
      </div>
      <div className="flex w-full h-[30%] px-3 items-end">
        <div className="justify-between w-full flex flex-row items-end py-4">
          <div className="flex flex-col justify-start items-center gap-2">
            <span className="text-xs">30% completed</span>
            <div className="w-[100px] h-1 bg-gray-300 rounded-full">
              <div className={`${WidthProgressBar[30]} h-full bg-light-primary rounded-full`}></div>
            </div>
          </div>
          <Button text="Continue" icon={<ArrowForwardIcon/>} />
        </div>
      </div>
    </div>
  );
};

export default SmallCourseCard;
