import { type TextProps } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { Currency, currencyOptions } from '../../models/currency';
import { ThemedText as Text } from '../ui/ThemedText';

interface Props extends TextProps {
  value: number | undefined;
  currency: Currency;
  prefix?: string;
}

export default function ThemedText(props: Props) {
  return (
    <NumericFormat
      value={props.value?.toFixed(currencyOptions[props.currency].fixed)}
      displayType={'text'}
      thousandSeparator={true}
      prefix={(props.prefix ?? '') + currencyOptions[props.currency].prefix}
      suffix={currencyOptions[props.currency].suffix}
      renderText={(text) => <Text style={props.style}>{text}</Text>}
    />
  );
}
