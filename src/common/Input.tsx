import { Autocomplete, MultiSelect } from '@mantine/core';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  maxLength?: number;
  rightLabel?: string;
  className?: string;
  height?: string;
  noResize?: boolean;
}

const Input = (props: InputProps) => {
  const className = `${props.className || ''} ${
    props.height || 'h-[45px]'
  } flex resize-none border border-light-border bg-white py-[10px] pl-[19px] text-gray-900 placeholder-light-text-placeholder focus:border-light-text-main focus:outline-none focus:ring-0`;
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex justify-between">
        <p className="text-base font-normal ">{props.label}</p>
        {props.rightLabel && (
          <p className="text-xs font-light text-[#727272]">{props.rightLabel}</p>
        )}
      </div>
      {!props.noResize ? (
        <ReactTextareaAutosize
          className={className}
          placeholder={props.placeholder}
          maxLength={props.maxLength || 999}
        />
      ) : (
        <input
          type={props.type}
          className={className}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
        />
      )}
    </div>
  );
};

function InputRounded(props: InputProps) {
  return <Input className="rounded-full" {...props} />;
}

const InputRectangle = (props: InputProps) => {
  return <Input {...props} className={`rounded-[5px] ${props.className}`} />;
};

interface InputAutoCompleteProps extends InputProps {
  options: string[];
  isMulti?: boolean;
}

const InputAutoComplete = (props: InputAutoCompleteProps) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex justify-between">
        <p className="text-base font-normal ">{props.label}</p>
        {props.rightLabel && (
          <p className="text-xs font-light text-[#727272]">{props.rightLabel}</p>
        )}
      </div>
      {props.isMulti ? (
        <MultiSelect
          searchable
          size="md"
          data={props.options}
          rightSection={<></>}
          placeholder={props.placeholder}
          className="placeholder-light-text-placeholder"
        />
      ) : (
        <Autocomplete
          size="md"
          data={props.options}
          className="placeholder-light-text-placeholder"
          placeholder={props.placeholder}
        />
      )}
    </div>
  );
};

export { InputAutoComplete, InputRectangle, InputRounded };
