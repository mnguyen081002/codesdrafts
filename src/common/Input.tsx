import { Autocomplete, Input, MultiSelect } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface InputProps {
  name: string;
  helperText?: string;
  label?: string;
  placeholder: string;
  type: string;
  maxLength?: number;
  rightLabel?: string;
  className?: string;
  height?: number;
  noResize?: boolean;
  minRows?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
  disabled?: boolean;
}

interface ThumbnailProps {
  name: string;
  helperText?: string;
  thumbnailUpload: any;
  setThumbnailUpload: any;
  hideCloseIcon?: boolean;
}

const RFHInputThumbnail = (props: ThumbnailProps) => {
  const { control } = useFormContext();
  const handleGetThumbnail = async () => {};

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input.Wrapper
          {...field}
          sx={{
            '.mantine-InputWrapper-error': {
              paddingTop: '5px',
            },
          }}
          error={error ? error?.message : props.helperText}
        >
          {!props.thumbnailUpload && (
            <div
              className={`flex
              ${
                props.hideCloseIcon ? 'h-[150px] w-[150px]' : 'h-[200px] w-[300px]'
              } flex-col items-center justify-center gap-[10px] rounded-[5px] border-2 border-dashed border-[#8F9397] py-[20px] px-[37px]`}
            >
              <img
                className="h-[55px] w-[55px] rounded-[5px]"
                src="/images/icons/wallpaper.svg"
                alt=""
              />
              {/* {!props.hideCloseIcon && (
                <>
                  <p className="font-lexend-deca text-sm font-normal leading-6 text-light-text-main">
                    1122 x 748
                  </p>
                  <p className="font-lexend-deca text-lg leading-6 text-light-text-main">
                    Tải ảnh lên
                    <span className="text-black"> hoặc kéo thả</span>
                  </p>
                  <p className="font-lexend-deca text-sm font-light text-[#8A8A8A]">
                    PNG, JPG, GIF lên đến 2MB
                  </p>
                  <input
                    type="file"
                    className={`absolute z-10 h-[200px] w-[300px] cursor-pointer rounded-[5px] opacity-0`}
                    onChange={(event) => {
                      if (event.target.files) {
                        props.setThumbnailUpload(event.target.files[0]);
                      }
                    }}
                    accept="image/png, image/jpeg, image/gif"
                  />
                </>
              )} */}
            </div>
          )}
          {props.thumbnailUpload && (
            <div className="relative w-fit">
              <img
                className={`${
                  props.hideCloseIcon ? 'h-[150px] w-[150px]' : 'h-[200px] w-[300px]'
                } rounded-[5px]`}
                src={
                  props.thumbnailUpload instanceof File
                    ? URL.createObjectURL(props.thumbnailUpload)
                    : props.thumbnailUpload
                }
                alt=""
              />
              {!props.hideCloseIcon && (
                <img
                  src="/images/icons/close.svg"
                  alt=""
                  onClick={() => props.setThumbnailUpload(undefined)}
                  className="absolute top-1 right-1 h-4 w-4 cursor-pointer rounded-full bg-white"
                />
              )}
              {props.hideCloseIcon && (
                <div
                  onClick={handleGetThumbnail}
                  className="absolute -bottom-4 -right-6 flex h-[28px] w-[60px] cursor-pointer items-center gap-[5px] rounded-md border-2 bg-white p-[6px]"
                >
                  <img src="/svg/edit.svg" alt="edit-icon" className="h-4 w-4 rounded-full" />
                  <span className="font-lexend-deca text-xs font-normal text-[#4c4e64]">Sửa</span>
                  <input
                    type="file"
                    className="absolute z-10 h-[28px] w-[60px] cursor-pointer rounded-[5px] opacity-0"
                    onChange={(event) => {
                      if (event.target.files) {
                        props.setThumbnailUpload(event.target.files[0]);
                      }
                    }}
                    accept="image/png, image/jpeg, image/gif"
                  />
                </div>
              )}
            </div>
          )}
        </Input.Wrapper>
      )}
    />
  );
};

export const InputCustom = (props: InputProps) => {
  const className = `${
    props.className || ''
  } flex resize-none border border-light-border bg-white py-[10px] px-[19px] text-gray-900 placeholder-light-text-placeholder focus:border-light-text-main focus:outline-none focus:ring-0`;
  return (
    <div className="flex flex-col">
      {props.label ? (
        <div className="flex justify-between gap-6">
          <p className="text-base font-normal ">{props.label}</p>
          {props.rightLabel && (
            <p className="text-xs font-light text-[#727272]">{props.rightLabel}</p>
          )}
        </div>
      ) : null}
      {!props.noResize ? (
        <ReactTextareaAutosize
          className={className}
          placeholder={props.placeholder}
          maxLength={props.maxLength || 999}
          minRows={props.minRows || 1}
          value={props.value}
          disabled={props.disabled}
        />
      ) : (
        <input
          type={props.type}
          className={className}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          style={{ height: props.height }}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      )}
    </div>
  );
};

function InputRounded(props: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name || ''}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input.Wrapper
          {...field}
          sx={{
            '.mantine-InputWrapper-error': {
              paddingTop: '5px',
            },
          }}
          error={error ? error?.message : props.helperText}
        >
          <InputCustom className="rounded-full" value={field.value} {...props} />
        </Input.Wrapper>
      )}
    />
  );
}

const InputRectangle = (props: InputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input.Wrapper
          {...field}
          sx={{
            '.mantine-InputWrapper-error': {
              paddingTop: '5px',
            },
          }}
          error={error ? error?.message : props.helperText}
        >
          <InputCustom
            value={field.value}
            {...props}
            className={`rounded-[5px] ${props.className}`}
          />
        </Input.Wrapper>
      )}
    />
  );
};

interface InputAutoCompleteProps extends InputProps {
  options: string[];
  isMulti?: boolean;
}

const InputAutoComplete = (props: InputAutoCompleteProps) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex justify-between">
        <p className="text-base font-normal ">{props.label}</p>
        {props.rightLabel && (
          <p className="text-xs font-light text-[#727272]">{props.rightLabel}</p>
        )}
      </div>
      {props.isMulti ? (
        <MultiSelect
          searchable
          size="md"
          data={props.options}
          rightSection={<></>}
          placeholder={props.placeholder}
          className="placeholder-light-text-placeholder"
        />
      ) : (
        <Autocomplete
          size="md"
          data={props.options}
          className="placeholder-light-text-placeholder"
          placeholder={props.placeholder}
        />
      )}
    </div>
  );
};

export { InputAutoComplete, InputRectangle, InputRounded, RFHInputThumbnail };
