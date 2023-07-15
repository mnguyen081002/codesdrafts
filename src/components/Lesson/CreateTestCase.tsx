import { useState } from 'react';

import CodeSmoothInstructorLessonApi from '../../api/instructor/lesson';
import type { ICodeContent } from '../../shared/interface';
import { PrimaryButton } from '../Button';
import { UnderlineNavbarWithOutSlug } from '../NavBar/UnderlineNavbar';
import CodeComponentEditor from './CodeEditorComponent';

interface ICreateTestCaseComponentProps {
  content: ICodeContent;
  language: string;
  isExercise: boolean;
  rerender: () => void;
}
function CreateTestCaseComponent(props: ICreateTestCaseComponentProps) {
  const [selectingTab, setSelectingTab] = useState('Tạo test cases');

  const getSampleTest = async () => {
    const r = await CodeSmoothInstructorLessonApi.getSampleTest(props.language);
    props.content.judgeContent.testCode = r.data.data.content.judgeContent.testCode;
    props.content.code = r.data.data.content.code;
    props.rerender();
  };
  return (
    <div
      className={`${
        !props.isExercise && 'hidden'
      } flex flex-col border-t border-light-border py-[12px]`}
    >
      <div className="px-4">
        <UnderlineNavbarWithOutSlug
          onChange={(value) => {
            setSelectingTab(value);
          }}
          value={selectingTab}
          navs={[
            {
              title: 'Tạo test cases',
            },
            {
              title: 'Code sẵn',
            },
            {
              title: 'Đáp án',
            },
          ]}
        />
      </div>
      <div className={`${selectingTab !== 'Tạo test cases' && 'hidden'}`}>
        <div className="py-[20px] px-[10px]">
          <p className="font-light">
            Viết code để tạo ra các test cases. Đánh giá sẽ dựa trên
            <span className="font-medium text-light-primary"> Test Result</span>
          </p>
          <div className="pt-[10px]">
            <PrimaryButton
              text="Lấy ví dụ TypeScript"
              className="rounded-none py-[9px] px-[12px]"
              onClick={getSampleTest}
            />
          </div>
        </div>
        <CodeComponentEditor
          onChange={(value) => {
            props.content.judgeContent.testCode = value;
          }}
          disableValidation
          language={props.language}
          value={props.content.judgeContent.testCode}
        />
      </div>
      <div className={`${selectingTab !== 'Code sẵn' && 'hidden'}`}>
        <div className="py-[20px] px-[10px]">
          <p className="font-light">Đoạn mã này sẽ được thêm vào đầu đoạn mã của học viên</p>
        </div>
        <CodeComponentEditor
          onChange={(value) => {
            props.content.judgeContent.sampleCode = value;
          }}
          language={props.language}
          value={props.content.judgeContent.sampleCode}
        />
      </div>
      <div className={`${selectingTab !== 'Đáp án' && 'hidden'}`}>
        <div className="py-[20px] px-[10px]">
          <p className="font-light">
            Viết đáp án của bài tập ở đây. Đáp án sẽ được hiện lên nếu học viên chọn nút “ Hiện đáp
            án “
          </p>
        </div>
        <CodeComponentEditor
          onChange={(value) => {
            props.content.judgeContent.answerCode = value;
          }}
          language={props.language}
          value={props.content.judgeContent.answerCode}
        />
      </div>
    </div>
  );
}

export default CreateTestCaseComponent;
