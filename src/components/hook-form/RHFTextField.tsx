// @mui
import type { Sx } from '@mantine/core';
import { Input } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  helperText?: string;
  placeholder?: string;
  sx?: Sx | (Sx | undefined)[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function RHFTextField({
  name,
  helperText,
  placeholder,
  className,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input.Wrapper error={error ? error?.message : helperText}>
          <Input
            placeholder={placeholder}
            {...field}
            {...other}
            onChange={(event) => {
              field.onChange(event);
              other.onChange?.(event);
            }}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            className={className}
          />
        </Input.Wrapper>
      )}
    />
  );
}
