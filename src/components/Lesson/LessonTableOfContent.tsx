import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import slugify from 'slugify';

import ArrowDownV3Icon from '../../common/Icons/ArrowDownV3';
import { ComponentType } from '../../shared/enum/component';
import type { IContent, ITextContent, LessonComponentProps } from '../../shared/interface';
import { extractTextFromLastHTMLTag } from '../../utils/app';

interface LessonTableOfContentProps {
  values: React.MutableRefObject<LessonComponentProps<IContent>>[];
}

function containsHeading(text: string) {
  const headings = ['<h1>', '<h2>', '<h3>', '<h4>'];

  for (let i = 0; i < headings.length; i++) {
    if (text.includes(headings[i]!)) {
      return i + 1; // return heading level
    }
  }

  return undefined;
}

export interface TableOfContent {
  text: string;
  children: TableOfContent[];
}

const getTableOfContentFormat = (
  input: {
    heading: number;
    text: string;
  }[],
) => {
  const stack: any = [];
  const output: TableOfContent[] = [];

  input.forEach((item) => {
    const newItem = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1]!.heading >= newItem.heading) {
      stack.pop();
    }

    if (stack.length > 0) {
      stack[stack.length - 1].children.push(newItem);
    } else {
      output.push(newItem);
    }

    stack.push(newItem);
  });

  return output;
};

const getS = (p: React.MutableRefObject<LessonComponentProps<IContent>>[]) =>
  p.map((e) => (e.current.content as ITextContent).html).join('');

function LessonTableOfContent(props: LessonTableOfContentProps) {
  const [tableOfContent, setTableOfContent] = useState<TableOfContent[]>([]);
  const data = useRef<React.MutableRefObject<LessonComponentProps<IContent>>[]>([]);
  console.log('Render LessonTableOfContent');
  const interval = useRef<any>();
  let s = '';
  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    if (props.values.length > 0) {
      interval.current = setInterval(() => {
        const texts = props.values.filter(
          (e) => e.current.type === ComponentType.Text,
        ) as MutableRefObject<LessonComponentProps<ITextContent>>[];
        const headings = texts.reduce(
          (
            acc: {
              heading: number;
              text: string;
            }[],
            curr,
          ) => {
            const heading = containsHeading(curr.current.content.html);
            if (heading) {
              acc.push({
                heading,
                text: extractTextFromLastHTMLTag(curr.current.content.html),
              });
            }
            return acc;
          },
          [],
        );
        if (s === getS(props.values)) return;
        s = getS(props.values);

        setTableOfContent(getTableOfContentFormat(headings));
      }, 100);
    }
  }, [props.values]);

  return (
    <div
      id="tableOfContent"
      className="absolute right-2 flex max-h-[246px] w-[300px] flex-col gap-[5px] overflow-y-auto bg-[#FAFAFA] py-[10px] pl-[20px] pr-[40px] font-lessonContent"
    >
      <div className="text-lg font-semibold leading-5 text-[#444]">Table of Content</div>
      <div className="relative">
        <ArrowDownV3Icon className="absolute rotate-180" />
      </div>
      {tableOfContent.map((item, index) => (
        <div key={index}>
          <a
            href={`#${slugify(item.text)}`}
            className="cursor-pointer text-lg font-semibold leading-5 text-[#444]"
          >
            {item.text}
          </a>
          <div className="flex flex-col pl-[15px]">
            {item.children.map((child, index) => (
              <div key={index}>
                <a
                  href={`#${slugify(child.text)}`}
                  key={index}
                  className="text-base text-[#5C5E60]"
                >
                  {child.text}
                </a>
                <div className="flex flex-col pl-[15px]">
                  {child.children.map((c, index) => (
                    <a
                      href={`#${slugify(c.text)}`}
                      key={index}
                      className="text-base text-[#5C5E60]"
                    >
                      {c.text}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LessonTableOfContent;
