import { Stack } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';

interface ILayout {
  children: React.ReactNode | React.ReactNode[];
}

const Layout = ({ children }: ILayout) => {
  return (
    <Stack gap={5} mx='auto' maxW='1000px' h='100vh'>
      <Navbar />
      <Stack mt={100}>{children}</Stack>
    </Stack>
  );
};

export default Layout;
