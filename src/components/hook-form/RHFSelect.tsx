import { Box, Flex, Input, Select } from '@mantine/core';
import Image from 'next/image';
import React, { type Dispatch, type SetStateAction, forwardRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { PaymentResponse } from '../Instructor/Profile';

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
  setValue?: Dispatch<SetStateAction<string[]>>;
  helperText?: string;
  isMulti?: boolean;
  creatable?: boolean;
  value?: string[] | string;
  noGap?: boolean;
  rightSection?: React.ReactNode;
  paymentList?: PaymentResponse[];
  haveIcon?: boolean;
  searchable?: boolean;
  nothingFound?: string;
}
// NOTE: RHF data.value not working with Mantine MultiSelect, use State instead
export default function RHFSelect(props: RHFInputAutoCompleteProps) {
  const { control } = useFormContext();

  const AutoCompleteItem = forwardRef<HTMLDivElement, any>(({ ...others }, ref) => {
    const foundItem = props.paymentList?.find((item) => item.name === others.value);
    return (
      <div ref={ref} {...others}>
        <Flex align="center">
          <Box mr={10}>
            <Image
              src={foundItem!.logo}
              alt={foundItem!.name}
              width={90}
              height={34}
              className="mr-2"
            />
          </Box>
          <div>{others.value}</div>
        </Flex>
      </div>
    );
  });

  AutoCompleteItem.displayName = 'AutoCompleteItem';

  const ref = React.useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [valueSelect, setValueSelect] = useState<string>('');

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
            <div className={`${props.noGap ? 'flex flex-col' : 'flex flex-col gap-[6px]'}`}>
              <div className="flex justify-between">
                <p className="text-base font-normal">{props.label}</p>
              </div>
              <Select
                value={valueSelect === '' ? field.value : valueSelect}
                onChange={(value) => {
                  field.onChange(value);
                  setValueSelect(value || '');
                }}
                size="md"
                data={props.options || []}
                className={`overflow-auto placeholder-light-text-placeholder ${props.className}`}
                placeholder={props.placeholder}
                itemComponent={props.haveIcon ? AutoCompleteItem : undefined}
                limit={63}
                sx={{
                  '& .mantine-Autocomplete-dropdown': {
                    maxHeight: '400px',
                    overflow: 'scroll',
                  },
                  '& .mantine-Input-input': {
                    height: '46px',
                  },
                }}
                ref={ref}
                nothingFound={props.nothingFound}
                rightSection={
                  <div
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      ref.current?.click();
                      ref.current?.focus();
                    }}
                  >
                    {props.rightSection}
                  </div>
                }
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                onDropdownClose={() => {
                  setIsDropdownOpen(false);
                }}
                onDropdownOpen={() => {
                  setIsDropdownOpen(true);
                }}
                searchable={props.searchable}
              />
            </div>
          </Input.Wrapper>
        );
      }}
    />
  );
}

interface RHFInputAutoCompletePropsV2 extends InputProps {
  name: string;
  options: string[];
  setValue?: Dispatch<SetStateAction<string[]>>;
  helperText?: string;
  isMulti?: boolean;
  creatable?: boolean;
  value?: string[] | string;
  noGap?: boolean;
  rightSection?: React.ReactNode;
  paymentList?: PaymentResponse[];
  searchable?: boolean;
  nothingFound?: string;
  itemComponent?: React.FC<any> | undefined;
}

export function RHFSelectV2(props: RHFInputAutoCompletePropsV2) {
  const { control } = useFormContext();

  // AutoCompleteItem.displayName = 'AutoCompleteItem';

  const ref = React.useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [valueSelect, setValueSelect] = useState<string>('');

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
            <div className={`${props.noGap ? 'flex flex-col' : 'flex flex-col gap-[6px]'}`}>
              <div className="flex justify-between">
                <p className="text-base font-normal">{props.label}</p>
              </div>
              <Select
                dropdownPosition="bottom"
                value={valueSelect === '' ? field.value : valueSelect}
                onChange={(value) => {
                  console.log('onChange', value);
                  if (value && props.options.includes(value)) {
                    field.onChange(value);
                    setValueSelect(value);
                  }
                }}
                onSearchChange={(value) => {
                  console.log('onSearchChange', value);

                  if (value !== '' && props.options.includes(value)) {
                    field.onChange(value);
                  } else {
                    field.onChange('');
                    setValueSelect(value);
                  }
                }}
                size="md"
                data={props.options || []}
                className={`overflow-auto placeholder-light-text-placeholder ${props.className}`}
                placeholder={props.placeholder}
                itemComponent={props.itemComponent}
                limit={63}
                sx={{
                  '& .mantine-Autocomplete-dropdown': {
                    maxHeight: '400px',
                    overflow: 'scroll',
                  },
                  '& .mantine-Input-input': {
                    height: '46px',
                  },
                }}
                ref={ref}
                nothingFound={props.nothingFound}
                rightSection={
                  <div
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      ref.current?.click();
                      ref.current?.focus();
                    }}
                  >
                    {props.rightSection}
                  </div>
                }
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                onDropdownClose={() => {
                  setIsDropdownOpen(false);
                }}
                onDropdownOpen={() => {
                  setIsDropdownOpen(true);
                }}
                searchable={props.searchable}
              />
            </div>
          </Input.Wrapper>
        );
      }}
    />
  );
}
