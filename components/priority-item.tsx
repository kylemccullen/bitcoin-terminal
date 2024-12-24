import { useContext } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { Colors } from '../constants/colors';
import { PriceContext } from '../context/price-context';
import { ThemedText } from './ui/ThemedText';

interface Props {
  style: ViewStyle;
  titleText: string;
  backgroundColor: string;
  value: number | undefined;
}

const AVERAGE_VB_PER_TRANSACTION = 150

export default function PriorityItem(props: Props) {
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
      <NumericFormat
        value={(averageFee).toFixed(2)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'~ $'}
        renderText={(text) => (
          <ThemedText style={styles.costText}>{text}</ThemedText>
        )}
      />
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
