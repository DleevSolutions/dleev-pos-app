import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationData from '@assets/icons/phone-animation.json';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { useAppDispatch } from '@hooks';
import { FormInputText } from '@components';
import { LoginContainer } from '@containers';
import type { UserLoginRequest } from '@types';
import { selectUserDetails, selectLoginLoading, login } from '@store';
import { validatorRequired, validatorMaxLength, validatorMinLength, validatorEmailFormat } from '@validators';

import theme from '@src/styles/theme';

export const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t: tSignIn } = useTranslation('signIn');

  const loginDetails = selectUserDetails();
  const loading = selectLoginLoading();
  const phoneRef = useRef<LottieRefCurrentProps>(null);

  const defaultValues = {
    email: '',
    password: '',
  };

  const { handleSubmit, reset, control } = useForm<any>({
    mode: 'onBlur',
    defaultValues,
    shouldFocusError: true,
    shouldUnregister: true,
  });

  useEffect(() => {
    if (loginDetails && Object.keys(loginDetails).length > 0 && !loading) {
      navigate('/dashboard');
      reset();
    }
  }, [loginDetails]);

  const onSubmitHandler = (data: UserLoginRequest) => {
    dispatch(login(data));
  };

  return (
    <LoginContainer fullHeight>
      <Box
        className="m-auto"
        sx={{
          border: '0px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        }}
      >
        <Stack
          spacing={2}
          sx={({ spacing, palette }) => ({
            minWidth: { xs: 'unset', sm: spacing(50) },
            padding: spacing(2),
            paddingTop: spacing(0),
            backgroundColor: palette.background.default,
          })}
        >
          <Lottie
            className="m-auto"
            style={{ width: theme.spacing(25), height: theme.spacing(25) }}
            lottieRef={phoneRef}
            animationData={animationData}
          />
          <Typography variant="headerS">{`${tSignIn('title')}`}</Typography>
          <Grid item>
            <FormInputText
              control={control}
              name="email"
              label={`${tSignIn('form.email')}`}
              fullWidth
              required
              rules={{
                required: validatorRequired(),
                minLength: validatorMinLength(1, 256),
                maxLength: validatorMaxLength(1, 256),
                pattern: validatorEmailFormat(),
              }}
            />
          </Grid>
          <Grid item>
            <FormInputText
              control={control}
              name="password"
              label={`${tSignIn('form.password')}`}
              fullWidth
              required
              rules={{
                required: validatorRequired(),
                minLength: validatorMinLength(1, 256),
                maxLength: validatorMaxLength(1, 256),
              }}
            />
          </Grid>
          <Button
            disabled={loading}
            onClick={handleSubmit(onSubmitHandler)}
            variant="outlined"
            data-testid="formSignInButton"
          >
            {`${tSignIn('signInButton')}`}
            {loading && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} data-testid="progressbar" />}
          </Button>
        </Stack>
      </Box>
    </LoginContainer>
  );
};
