import {
  ThemeConfig,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import foundation from './foundation';
import components from './components';

const config: ThemeConfig = {
  initialColorMode: 'light', // light, dark or system
  useSystemColorMode: false,
};

const overrides = {
  config,
  ...foundation,
  components,
};

export const customTheme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: 'primary' })
);
