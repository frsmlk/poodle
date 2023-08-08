import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle({
  borderRadius: 8, // remove the border radius
  fontWeight: 500, // change the font weight
  color: 'black',
  bg: 'primary.600',
  _hover: {
    bg: 'primary.800',
  },
  _disabled: {
    bg: 'primary.100',
    opacity: 1,
    color: 'rgba(0, 0, 0, 0.2)',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { solid },
});
