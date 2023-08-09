import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingIcon from '../assets/icons/hourglass.svg';
import CustomInput from '../components/CustomInput';
import { auth, db } from '../firebase';
import useToast from '../hooks/useToast';
import { TextStyle } from '../theme/types';

interface IErrors {
  email?: string;
  password?: string;
}

const useMode = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const result = queryParams.get('mode');
  return result === 'sign-in' ? 'sign-in' : 'sign-up'; // Default to 'sign-up' if result is not 'sign-in'
};

const Authorization = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<IErrors>({});
  const mode = useMode();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  if (user) navigate('/breed');

  useEffect(() => {
    setInput({ email: '', password: '' });
  }, [mode]);

  const templates = {
    'sign-up': {
      title: 'Create your account',
      buttonText: 'Sign up',
      alternateLink: '/?mode=sign-in',
      submitFunction: createUserWithEmailAndPassword,
      optionText: 'Already have an account?',
      optionText2: 'Sign in',
    },
    'sign-in': {
      title: 'Sign into your account',
      buttonText: 'Sign in',
      alternateLink: '/',
      submitFunction: signInWithEmailAndPassword,
      optionText: "Don't have an account?",
      optionText2: 'Sign up',
    },
  };

  const template = templates[mode || 'sign-up'];

  const validateEmail = (email: string) => {
    if (email.length > 0 && !email.includes('@')) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(input.email);
    const passwordError = validatePassword(input.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      const request = await template.submitFunction(
        auth,
        input.email,
        input.password
      );

      if (mode === 'sign-up') {
        await setDoc(doc(db, 'users', request.user.uid), {
          email: request.user.email,
          favouriteBreeds: [],
        });
      }

      successToast({
        description: `Welcome to Poodle`,
      });
    } catch (error) {
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <Stack gap={12} align='center'>
      <Box py={50}>
        <Text textStyle={TextStyle.H1} textAlign='center'>
          {template.title}
        </Text>
      </Box>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack gap={8} minW={['100%', '100%', '420px']}>
          <CustomInput
            name='email'
            placeholder='Enter your email'
            value={input.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput({ ...input, email: e.target.value })
            }
            isError={!!errors.email}
            errorText={errors.email}
          />
          <CustomInput
            name='password'
            type='password'
            placeholder={
              mode === 'sign-up' ? 'Create a password' : 'Enter your password'
            }
            value={input.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput({ ...input, password: e.target.value })
            }
            helperText='Password must be at least 8 characters'
            isError={!!errors.password}
            errorText={errors.password}
          />
          <Button
            type='submit'
            isDisabled={!input.email || !input.password}
            size='lg'
          >
            {loading ? <Image src={LoadingIcon} /> : template.buttonText}
          </Button>
        </Stack>
      </form>
      <Text textStyle={TextStyle.BodySmall} color='rgb(0,0,0,0.3)'>
        {template.optionText}{' '}
        <Link
          to={template.alternateLink}
          style={{ textDecoration: 'underline' }}
        >
          {template.optionText2}
        </Link>
      </Text>
    </Stack>
  );
};

export default Authorization;
