import { useContext } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { PriceContext } from '../context/price-context';
import { SettingsContext } from '../context/settings-context';
import CurrencyText from './ui/currency-text';
import { ThemedText } from './ui/ThemedText';

interface Props {
  style: ViewStyle;
  titleText: string;
  backgroundColor: string;
  value: number | undefined;
}

const AVERAGE_VB_PER_TRANSACTION = 150

export default function PriorityItem(props: Props) {
  const { settings } = useContext(SettingsContext);
  const { price } = useContext(PriceContext);

  const averageFee = (price ?? 0) * (props.value ?? 0) * AVERAGE_VB_PER_TRANSACTION / 100000000;

  return (
    <View style={props.style}>
      <Text
        style={{
          ...styles.itemHeaderText,
          backgroundColor: props.backgroundColor,
        }}
      >
        {props.titleText}
      </Text>
      <View style={styles.fee}>
        <ThemedText style={styles.feeValue}>{props.value ?? '-'}</ThemedText>
        <Text style={styles.unit}>sats/vB</Text>
      </View>
      <CurrencyText
        style={styles.costText}
        value={averageFee}
        currency={settings?.currency!}
        prefix='~ ' />
    </View>
  );
}

const styles = StyleSheet.create({
  itemHeaderText: {
    borderRadius: 6,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  fee: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feeValue: {
    maxWidth: '60%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unit: {
    maxWidth: '40%',
    color: Colors.lightText,
  },
  costText: {
    textAlign: 'center'
  }
});
