import { Stack, Button, Text } from '@chakra-ui/react';
import { TextStyle } from '../../theme/types';
import CustomInput from '../CustomInput';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  return (
    <Stack gap={12} align='center'>
      <Text textStyle={TextStyle.H1}>Create your account</Text>
      <form>
        <Stack gap={8} minW='420px'>
          <CustomInput
            type='email'
            name='email'
            placeholder='Enter your email'
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <CustomInput
            name='password'
            type='password'
            placeholder='Enter your password'
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <Button isDisabled size='lg'>
            Sign Up
          </Button>
        </Stack>
      </form>
      <Text textStyle={TextStyle.BodySmall}>
        Already have an account?{' '}
        <Link to='/' style={{ textDecoration: 'underline' }}>
          Log in
        </Link>
      </Text>
    </Stack>
  );
};

export default SignUp;
