// const fetcher = (url: string) => fetch(url).then((res) => res.json());
import React, {  FC, useEffect, useRef, useState } from "react";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { onDrag, selectComponents, setComponents } from "../features/auth/componentsSlice";
import { LessionComponent } from "../components/LessionComponent";
import { LessionComponentProps } from "../shared/interface";







const Course = () => {
  // const { courseId } = useParams();
  // const { data, error } = useSWR(`/api/courses/${courseId}`, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  const components = useAppSelector(selectComponents);
  console.log(components);
  
  const dragItemRef = useRef<any>(null);
  const dragItemOverRef = useRef<any>(null);
  console.log("Course");
  
  const dispatch = useAppDispatch();
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="w-full flex justify-start">
        <div className="w-[15%]">Hello</div>
        <div className="w-[85%] flex justify-center">
          <div className="w-[70%] flex flex-col my-20">
            <input
              type="text"
              placeholder="Title"
              className="border w-full mb-12 rounded-normal p-2 border-gray-400 outline-none"
            />

            <textarea
              placeholder="Summary"
              className="border w-full rounded-normal h-36 p-2 border-gray-400 resize-none outline-none"
            />

            <div className="flex flex-col mt-8 gap-2">
              {components.map((component: LessionComponentProps, index: number) => {
                return (
                  <LessionComponent
                    isLast={index === components.length - 1}
                    component={component}
                    index={index}
                    onDragStart={(e: any) => {
                      dragItemRef.current = index;
                    }}
                    onDragEnter={(e: any) => {
                      dragItemOverRef.current = index;
                    }}
                    onDragEnd={(e: any) => {
                      console.log(dragItemRef.current, dragItemOverRef.current);
                      dispatch(
                        onDrag({
                          dragIndex: dragItemRef.current,
                          hoverIndex: dragItemOverRef.current,
                        }),
                      );
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Course;
