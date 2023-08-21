import { Card, Divider, Rating } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { UserInfo } from '@/api/instructor/lesson';

import { socialSettings } from '../Instructor/Profile';

type Props = {
  profile: UserInfo;
};

export const InstructorDetail = (props: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="8px" withBorder className="mr-8 w-[1440px]">
      <div className="flex items-start">
        <Image
          className="mr-9"
          src={props.profile.avatar}
          alt="instructor-avatar"
          width={270}
          height={294}
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <span className="font-lexend-deca text-[26px] font-semibold">
              {props.profile.username}
            </span>
            <div className="mr-[170px] flex items-center gap-1">
              {socialSettings.map((item) => {
                if (!props.profile[item.name]) return null;
                return (
                  <div key={item.name} className="flex w-full cursor-pointer items-center">
                    <Link
                      href={`${props.profile[item.name]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={item.icon} alt={item.name} width={40} height={40} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <p>{props.profile.title}</p>
          <div className="flex items-center gap-5">
            <Rating value={5} readOnly />
            <p>(4.3 Reviews)</p>
            <div className="flex items-center gap-1">
              <Image src="/svg/mail.svg" alt="mail" width={17} height={12} />
              <span>{props.profile.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image src="/svg/student.svg" alt="mail" width={17} height={12} />
              <span>1135</span>
            </div>
            <div className="flex items-center gap-1">
              <Image src="/svg/course.svg" alt="mail" width={17} height={12} />
              <span>12 khóa học</span>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex flex-col">
            <p>Short bio:</p>
            <p>{props.profile.bio}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
