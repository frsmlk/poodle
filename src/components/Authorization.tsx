import { Button, Stack, Text, useToast } from '@chakra-ui/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { TextStyle } from '../theme/types';
import CustomInput from './CustomInput';

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
  const toast = useToast();
  const mode = useMode();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user) navigate('/breed');

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
      await template.submitFunction(auth, input.email, input.password);
      toast({
        title: `Welcome to Poodle`,
        duration: 5000,
        isClosable: true,
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack gap={12} align='center'>
      <Text textStyle={TextStyle.H1}>{template.title}</Text>
      <form onSubmit={handleSubmit}>
        <Stack gap={8} minW='420px'>
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
            placeholder='Create your password'
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
            {template.buttonText}
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
