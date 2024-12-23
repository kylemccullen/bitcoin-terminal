import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { ThemedText } from './ui/ThemedText';

interface Props {
  style: ViewStyle;
  titleText: string;
  backgroundColor: string;
  value: number | undefined;
}

export default function PriorityItem(props: Props) {
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
});
