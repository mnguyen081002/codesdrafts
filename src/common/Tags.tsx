import ClearIcon from '@mui/icons-material/Clear';
import type { FC } from 'react';
import { useState } from 'react';

interface TagsProps {
  className?: string;
  setValue?: (value: string[]) => void;
  value: string[];
  options?: string[];
  placeholder?: string;
}

type AutocompleteType<T, Multiple extends boolean | undefined> = Multiple extends true
  ? Array<T>
  : T;

interface AutocompleteProps<T, Multiple extends boolean | undefined> {
  multiple: Multiple;
  id?: string;
  filterSelectedOptions: boolean;
  options?: string[];
  getOptionLabel: (option: string) => string;
  placeholder?: string;
  value: any;
  setValue?: (value: AutocompleteType<T, Multiple>) => void;
  renderInput?: (params: any) => JSX.Element;
}

export function Autocomplete2<T, Multiple extends boolean | undefined>(
  props: AutocompleteProps<T, Multiple>,
) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFocus = (focus: boolean) => {
    setIsFocused(focus);
  };

  const handleAdd = (tag: string) => {
    if (props.setValue) {
      props.value.push(tag);
      props.setValue(props.value);
    }
    handleFocus(false);
  };

  const handleEnter = (e) => {
    if (props.options) {
      return;
    }

    if (props.value.includes(inputValue)) {
      return;
    }

    if (e.key === 'Enter') {
      handleAdd(inputValue);
      setInputValue('');
      e.currentTarget.value = '';
    }
  };

  return (
    <div
      className="relative flex items-center  rounded-md border border-slate-300 py-1 px-5"
      onFocus={() => handleFocus(true)}
      tabIndex={100}
      onBlur={(e) => {
        const { currentTarget } = e;

        // Give browser time to focus the next element
        requestAnimationFrame(() => {
          // Check if the new focused element is a child of the original container
          if (!currentTarget.contains(document.activeElement)) {
            handleFocus(false);
          }
        });
      }}
    >
      <div className="flex h-full w-full flex-row flex-wrap items-center">
        {props.value instanceof Array ? (
          props.value.map((tag, index) => {
            return (
              <div
                key={index}
                className="ml-2 flex h-7 items-center justify-center rounded-full bg-gray-200 px-3"
              >
                <span className="whitespace-nowrap text-sm font-medium text-gray-700">{tag}</span>
                <div
                  className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-slate-300"
                  onClick={() => {
                    if (props.setValue) {
                      props.setValue(props.value.filter((t) => t !== tag));
                    }
                  }}
                >
                  <ClearIcon style={{ color: '#fff', fontSize: '14px' }} />
                </div>
              </div>
            );
          })
        ) : (
          <div>{props.value}</div>
        )}
        <input
          type="text"
          placeholder={props.placeholder}
          className="flex-1 border-none bg-white pl-3 placeholder:text-base placeholder:text-slate-400"
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        />
        {isFocused && props.options && (
          <div className="absolute top-10 h-40 w-full overflow-y-scroll border border-slate-300 bg-white">
            {props.options
              .filter((tag) => {
                if (props.filterSelectedOptions) {
                  return !props.value.includes(tag) && tag.includes(inputValue.toLowerCase());
                }
                return tag.includes(inputValue);
              })
              .map((tag) => {
                return (
                  <div
                    key={tag}
                    className="cursor-pointer px-3 py-2 text-sm font-normal hover:bg-gray-200"
                    onClick={() => handleAdd(tag)}
                  >
                    {tag}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export const Tags: FC<TagsProps> = (props) => {
  return (
    <Autocomplete2
      multiple
      placeholder={props.placeholder}
      id="tags-outlined"
      filterSelectedOptions
      options={props.options}
      getOptionLabel={(option) => option}
      value={props.value}
      setValue={props.setValue}
    />
  );
};
