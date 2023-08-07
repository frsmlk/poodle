import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    fontFamily: 'mono',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    _placeholder: { color: 'gray.300' },
    _active: { borderColor: 'primary.400' },
    borderRadius: 8,
  },
  variants: {},
  defaultProps: {
    variant: null, // null here
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
