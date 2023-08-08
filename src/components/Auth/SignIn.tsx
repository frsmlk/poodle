import { Stack, Button, Text } from '@chakra-ui/react';
import { TextStyle } from '../../theme/types';
import CustomInput from '../CustomInput';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Stack gap={12} align='center'>
      <Text textStyle={TextStyle.H1}>Sign into your account</Text>
      <form>
        <Stack gap={8} minW='420px'>
          <CustomInput
            type='email'
            name='email'
            placeholder='Enter your email'
          />
          <CustomInput
            name='password'
            type='password'
            placeholder='Create your password'
          />
          <Button isDisabled size='lg'>
            Sign In
          </Button>
        </Stack>
      </form>
      <Text textStyle={TextStyle.BodySmall}>
        Don't have an account?{' '}
        <Link to='/sign-up' style={{ textDecoration: 'underline' }}>
          Sign up
        </Link>
      </Text>
    </Stack>
  );
};

export default SignIn;
