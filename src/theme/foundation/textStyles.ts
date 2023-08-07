import { TextStyle } from '../types';

type TextStyleValue = {
  fontSize: string | string[];
  lineHeight?: string | string[];
  letterSpacing?: string | string[];
};

type TextStyles = Record<TextStyle, TextStyleValue>;

const textStyles: TextStyles = {
  H1: {
    fontSize: '2rem',
    lineHeight: '2.5rem',
  },
  H2: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
  },
  H3: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
  },
  H4: {
    fontSize: '1.25rem',
    lineHeight: '1.603rem',
  },
  Label: {
    fontSize: '1rem',
    lineHeight: '1.282rem',
  },
  LabelSmall: {
    fontSize: '0.875rem',
    lineHeight: '1.122rem',
  },
  BodyLarge: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
  },
  BodyRegular: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  BodySmall: {
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
  },
};

export default textStyles;
