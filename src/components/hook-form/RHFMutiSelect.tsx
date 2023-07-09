import { Autocomplete, Input, MultiSelect } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  helperText?: string;
  label?: string;
  placeholder: string;
  type: string;
  maxLength?: number;
  rightLabel?: string;
  className?: string;
  height?: string;
  noResize?: boolean;
}

interface RHFInputAutoCompleteProps extends InputProps {
  name: string;
  options: string[];
  setOptions?: Dispatch<SetStateAction<string[]>>;
  helperText?: string;
  isMulti?: boolean;
  creatable?: boolean;
}

export default function RHFMutiSelect(props: RHFInputAutoCompleteProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Input.Wrapper
            {...field}
            sx={{
              '.mantine-InputWrapper-error': {
                paddingTop: '5px',
              },
            }}
            error={error ? error.message : props.helperText}
          >
            <div className="flex flex-col gap-[6px]">
              <div className="flex justify-between">
                <p className="text-base font-normal ">{props.label}</p>
              </div>
              {props.isMulti ? (
                <MultiSelect
                  value={field.value}
                  searchable
                  creatable={props.creatable}
                  size="md"
                  data={props.options.length > 0 ? props.options : field.value || []}
                  getCreateLabel={(query) => `${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query };
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    props.setOptions && props.setOptions([]);
                    return item;
                  }}
                  onKeyDown={(e: any) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    props.setOptions && props.setOptions([e.target.value]);
                  }}
                  rightSection={<></>}
                  placeholder={props.placeholder}
                  className="placeholder-light-text-placeholder"
                />
              ) : (
                <Autocomplete
                  value={field.value}
                  size="md"
                  data={props.options}
                  className="placeholder-light-text-placeholder"
                  placeholder={props.placeholder}
                />
              )}
            </div>
          </Input.Wrapper>
        );
      }}
    />
  );
}
