import type { SelectItemProps } from '@mantine/core';
import { Autocomplete, Box, Flex, Input, MultiSelect } from '@mantine/core';
import Image from 'next/image';
import { type Dispatch, type SetStateAction, forwardRef } from 'react';
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
}
// NOTE: RHF data.value not working with Mantine MultiSelect, use State instead
export default function RHFMutiSelectPayment(props: RHFInputAutoCompleteProps) {
  const { control, setValue } = useFormContext();

  const Item = forwardRef<HTMLDivElement, SelectItemProps>(({ label, value, ...others }, ref) => {
    const foundItem = props.paymentList?.find((item) => item.name === label);
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
          <div>{label}</div>
        </Flex>
      </div>
    );
  });

  Item.displayName = 'Item';

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
                <p className="text-base font-normal ">{props.label}</p>
              </div>
              {props.isMulti ? (
                <MultiSelect
                  value={props.value as string[]}
                  searchable
                  creatable={props.creatable}
                  size="md"
                  data={props.options || []}
                  getCreateLabel={(query) => `${query}`}
                  onChange={(value) => {
                    console.log('value', value);
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    props.setValue && props.setValue(value);
                  }}
                  rightSection={<></>}
                  placeholder={props.placeholder}
                  className="placeholder-light-text-placeholder"
                  itemComponent={Item}
                />
              ) : (
                <>
                  <Autocomplete
                    value={field.value || ''}
                    onChange={(value) => {
                      const foundItem = props.paymentList?.find((item) => item.name === value);
                      field.onChange(foundItem?.code);
                    }}
                    size="md"
                    data={props.options || []}
                    className="overflow-auto placeholder-light-text-placeholder"
                    placeholder={props.placeholder}
                    rightSection={props.rightSection}
                    itemComponent={AutoCompleteItem}
                    limit={63}
                    sx={{
                      '& .mantine-Autocomplete-dropdown': {
                        maxHeight: '400px',
                        overflow: 'scroll',
                      },
                    }}
                  />
                </>
              )}
            </div>
          </Input.Wrapper>
        );
      }}
    />
  );
}
