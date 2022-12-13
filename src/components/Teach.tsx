import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const Teach = () => {
  return (
    <>
      <Link href="/editlesson" className="flex flex-col justify-center my-10 w-[90%] px-[10%]">
        <div className="flex h-[330px] flex-col w-72 rounded hover:shadow-lg duration-500 justify-center items-center cursor-pointer border border-gray-200 bg-gray-200">
          <div className="flex flex-col items-center">
            <AddIcon style={{ fontSize: "100px" }} />
            <p>Create New Course</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Teach;
