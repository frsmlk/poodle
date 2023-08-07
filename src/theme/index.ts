import {
  ThemeConfig,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import foundation from './foundation';

const config: ThemeConfig = {
  initialColorMode: 'light', // light, dark or system
  useSystemColorMode: false,
};

const overrides = {
  config,
  ...foundation,
};

export const customTheme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: 'primary' })
);
