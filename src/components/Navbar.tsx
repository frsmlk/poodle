import { Flex, Button, Image, Text } from '@chakra-ui/react';
import { TextStyle } from '../theme/types';
import Logo from '../assets/images/needle_logo.png';

const Navbar = () => {
  return (
    <Flex p={4} justify='space-between'>
      <Flex align='center' gap={2}>
        <Image w='35px' src={Logo} alt='logo' />
        <Text textStyle={TextStyle.H3} fontWeight={700} fontFamily='Poppins'>
          Poodle
        </Text>
      </Flex>
      <Button variant='solid'>Sign in</Button>
    </Flex>
  );
};

export default Navbar;
