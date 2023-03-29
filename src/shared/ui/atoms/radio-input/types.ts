import { theme } from '../../../../ui/theme';

export type TRadioOptions = {
  label: string;
  value: string;
};

export type TDigitalColors = keyof typeof theme.colors.digital;
