import CheckboxOption from './CheckboxOption';

interface ICodeToolbarProps {
  language: string;
  setLanguage: (language: string) => void;
  content: {
    runable: boolean;
    isReadOnly: boolean;
    isExercise: boolean;
  };
  rerender: () => void;
}

function CodeToolbar(props: ICodeToolbarProps) {
  return (
    <div className=" flex h-[80px] flex-col gap-[9px] rounded-[5px] p-[15px] py-[10px]">
      <div className="flex w-fit items-center gap-[20px]">
        <p className="text-sm font-medium">Ngôn ngữ</p>
        <div className="flex w-[200px] items-center gap-[10px] border border-light-border px-[10px]">
          <img className="h-[20px] w-[20px]" src="/images/icons/search.svg" alt="" />
          <input
            value={props.language}
            onChange={(e) => {
              props.setLanguage(e.target.value);
            }}
            className="h-fit border-none bg-white text-sm font-light capitalize"
          />
        </div>
      </div>
      <div className="flex w-fit items-center gap-[20px]">
        <CheckboxOption
          label="Thực thi"
          checked={props.content.runable}
          onChange={(e) => {
            props.content.runable = e.target.checked;
            props.rerender();
          }}
        />
        <CheckboxOption
          label="Bài tập"
          checked={props.content.isExercise}
          onChange={(e) => {
            props.content.isExercise = e.target.checked;
            props.rerender();
          }}
        />
        <CheckboxOption
          label="Chỉ đọc"
          checked={props.content.isReadOnly}
          onChange={(e) => {
            props.content.isReadOnly = e.target.checked;
            props.rerender();
          }}
        />
      </div>
    </div>
  );
}

export default CodeToolbar;
