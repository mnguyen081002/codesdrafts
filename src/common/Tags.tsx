import ClearIcon from "@mui/icons-material/Clear";
import { TextField, Autocomplete } from "@mui/material";
import { FC, useState } from "react";

interface TagsProps {
  className?: string;
  setValue?: (value: string[]) => void;
  value: string[];
  options: string[];
  placeholder?: string;
}

type AutocompleteType<T, Multiple extends boolean | undefined> = Multiple extends true
  ? Array<T>
  : T;

interface AutocompleteProps<T, Multiple extends boolean | undefined> {
  multiple: Multiple;
  id?: string;
  filterSelectedOptions: boolean;
  options: string[];
  getOptionLabel: (option: string) => string;
  placeholder?: string;
  value: any;
  setValue?: (value: AutocompleteType<T, Multiple>) => void;
  renderInput?: (params: any) => JSX.Element;
}

export function Autocomplete2<T, Multiple extends boolean | undefined>(
  props: AutocompleteProps<T, Multiple>,
) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFocus = (focus: boolean) => {
    setIsFocused(focus);
  };
  return (
    <div
      className="flex relative rounded-md py-1 border border-slate-300 items-center "
      onFocus={() => handleFocus(true)}
      tabIndex={100}
      onBlur={(e) => {
        const currentTarget = e.currentTarget;

        // Give browser time to focus the next element
        requestAnimationFrame(() => {
          // Check if the new focused element is a child of the original container
          if (!currentTarget.contains(document.activeElement)) {
            handleFocus(false);
          }
        });
      }}
    >
      <div className="flex flex-row h-full w-full items-center flex-wrap">
        {props.value instanceof Array ? (
          props.value.map((tag) => {
            return (
              <div className="flex ml-2 items-center justify-center h-7 px-3 bg-gray-200 rounded-full">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{tag}</span>
                <div className="flex ml-2 h-4 w-4 bg-slate-300 rounded-full items-center justify-center cursor-pointer">
                  <ClearIcon
                    style={{ color: "#fff", fontSize: "14px" }}
                    onClick={() => {
                      if (props.setValue) {
                        props.setValue(props.value.filter((t) => t !== tag));
                      }
                    }}
                  />
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
          className="flex-1 border-none pl-3 bg-white"
          onChange={handleInputChange}
        />
        {isFocused && (
          <div className="absolute top-10 h-40 overflow-y-scroll w-full bg-white border border-slate-300">
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
                    className="px-3 text-sm font-normal py-2 cursor-pointer hover:bg-gray-200"
                    onClick={(e) => {
                      console.log(props.value);
                      if (props.setValue) {
                        props.value.push(tag);
                        props.setValue(props.value);
                      }
                      handleFocus(false);
                    }}
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

