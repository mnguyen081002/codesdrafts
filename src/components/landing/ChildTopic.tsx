import { Text, Title } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';

import type { ITopic } from './type';

const ChildTopic = ({ topic }: { topic: ITopic }) => {
  const [isHover, setIsHover] = useState<Boolean | null>(false);
  const handlerHover = () => {
    setIsHover(null);
  };
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handlerHover}
      className="group flex h-[262px] cursor-pointer flex-col items-center gap-4 rounded-md bg-white px-8 pt-8 text-[#6F6B80] shadow-md transition-all hover:bg-light-primary hover:text-white"
    >
      {!isHover ? (
        <Image src={topic.image} width={50} height={50} alt="" />
      ) : (
        <Text align="center" fz="md" h="50px" className="flex items-center">
          3 Course
        </Text>
      )}
      <Title align="center" order={2} className="text-black group-hover:text-white">
        {topic.title}
      </Title>
      <Text align="center" fz="md">
        {topic.description}
      </Text>
    </div>
  );
};

export default ChildTopic;
