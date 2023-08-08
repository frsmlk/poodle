import { Flex, Button, Image, Text } from '@chakra-ui/react';
import { TextStyle } from '../theme/types';
import Logo from '../assets/images/needle_logo.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { successToast } = useToast();

  return (
    <Flex p={4} justify='space-between'>
      <Flex align='center' gap={2}>
        <Image w='35px' src={Logo} alt='logo' />
        <Text textStyle={TextStyle.H3} fontWeight={700} fontFamily='Poppins'>
          Poodle
        </Text>
      </Flex>
      {user ? (
        <Button
          variant='solid'
          onClick={() => {
            signOut(auth);
            successToast({
              description: 'You have successfully signed out!',
            });
          }}
        >
          Sign out
        </Button>
      ) : (
        <Button variant='solid' onClick={() => navigate('/?mode=sign-in')}>
          Sign in
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
