// @mui
import { Input, PasswordInput } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  helperText?: string;
  placeholder?: string;
  styles?: any;
};

export default function RHFPasswordField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input.Wrapper error={error ? error?.message : helperText}>
          <PasswordInput
            {...field}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            {...other}
          />
        </Input.Wrapper>
      )}
    />
  );
}
