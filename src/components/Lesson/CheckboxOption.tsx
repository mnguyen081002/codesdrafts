import { Checkbox } from '@mantine/core';

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) {
  return (
    <div className="flex items-center gap-[10px]">
      <p className="text-[13px] font-normal">{label}</p>
      <Checkbox
        checked={checked}
        onChange={onChange}
        sx={{
          '& .mantine-1ertlen:checked': {
            backgroundColor: '#1363DF',
            borderColor: '#1363DF',
            borderRadius: '3px',
            height: '16px',
            width: '16px',
            cursor: 'pointer',
          },
          '& .mantine-1ertlen': {
            borderColor: '#1363DF',
            borderRadius: '3px',
            height: '16px',
            width: '16px',
            cursor: 'pointer',
          },
          '& .mantine-Checkbox-inner': {
            height: '16px',
            width: '16px',
          },
        }}
      />
    </div>
  );
}

export default CheckboxOption;
