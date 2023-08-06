// @mui
import type { Sx } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  helperText?: string;
  placeholder?: string;
  sx?: Sx | (Sx | undefined)[];
  className?: string;
};

export default function RHFArea({ name, helperText, placeholder, className, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Textarea
          className={className}
          placeholder={placeholder}
          {...field}
          {...other}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={error ? error?.message : helperText}
        />
      )}
    />
  );
}
