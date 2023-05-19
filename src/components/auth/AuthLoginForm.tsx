import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// @mui
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
// next
import { signIn } from 'next-auth/react';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { useSnackbar } from '@/components/snackbar/index';
import { PATH_DASHBOARD } from '@/routes/path';

// components
import Iconify from '../iconify';
// routes

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;
  const router = useRouter();

  const onSubmit = async (data: FormValuesProps) => {
    const { email, password } = data;
    setLoading(true);
    const result: any = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: PATH_DASHBOARD.main,
    });
    if (result?.error) {
      setLoading(false);
      enqueueSnackbar(result?.error, { variant: 'error' });
    } else {
      reset(defaultValues);
      enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
      router.push(PATH_DASHBOARD.main);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        sx={{
          backgroundColor: 'blue',
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
