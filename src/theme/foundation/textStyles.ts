import { TextStyle } from '../types';

type TextStyleValue = {
  fontSize: string | string[];
  lineHeight?: string | string[];
  letterSpacing?: string | string[];
  fontFamily?: string;
  fontWeight?: string;
};

type TextStyles = Record<TextStyle, TextStyleValue>;

const textStyles: TextStyles = {
  H1: {
    fontSize: '2rem',
    lineHeight: '2.5rem',
    fontWeight: '500',
  },
  H2: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    fontWeight: '500',
  },
  H3: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    fontWeight: '500',
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
  LabelInput: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.031rem',
  },
  BodyLarge: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    fontFamily: 'Work Sans, sans-serif',
  },
  BodyRegular: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontFamily: 'Work Sans, sans-serif',
  },
  BodySmall: {
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    fontFamily: 'Work Sans, sans-serif',
  },
};

export default textStyles;
