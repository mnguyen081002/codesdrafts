// @mui
import { Input } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  helperText?: string;
  placeholder?: string;
  sx?: any;
};

export default function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input.Wrapper error={error ? error?.message : helperText}>
          <Input
            {...field}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            {...other}
          />
        </Input.Wrapper>
      )}
    />
  );
}
