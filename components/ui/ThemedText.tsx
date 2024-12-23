import { Text, type TextProps } from 'react-native';
import { Colors } from '../../constants/colors';
import { useThemeColor } from '../../hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  textColorName?: keyof typeof Colors.light & keyof typeof Colors.dark
};

export function ThemedText({ style, textColorName, ...otherProps }: ThemedTextProps) {
  const color = useThemeColor(textColorName ?? 'text');

  return <Text style={[{ color }, style]} {...otherProps} />;
}
