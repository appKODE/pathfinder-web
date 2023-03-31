import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../src/ui/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const ThemeDecorator = Story => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [ThemeDecorator];
