import { CourseLevel } from '../../shared/enum/course';

interface LevelIconProps {
  level: CourseLevel;
  mainColor: string;
}

const LevelIcon = (props: LevelIconProps) => {
  const level = Object.values(CourseLevel).findIndex((item) => item === props.level) + 1;

  return (
    <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.0898438 10.3664H5.37142V15.1129H0.0898438V10.3664Z"
        fill={`${level > 0 ? props.mainColor : '#D9D9D9'}`}
      />
      1\
      <path
        d="M6.75394 5.61984H12.0355V15.1129H6.75394V5.61984Z"
        fill={`
      ${level > 1 ? props.mainColor : '#D9D9D9'}
    `}
      />
      <path
        d="M13.6283 0.879883H18.9098V15.1194H13.6283V0.879883Z"
        fill={`
      ${level > 2 ? props.mainColor : '#D9D9D9'}
    `}
      />
    </svg>
  );
};

LevelIcon.defaultProps = {
  level: CourseLevel.Basic,
  mainColor: '#1363DF',
};

export default LevelIcon;
