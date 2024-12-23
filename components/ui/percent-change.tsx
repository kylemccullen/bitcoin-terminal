import { StyleSheet, Text } from 'react-native';

interface Props {
  value: number;
}

export default function PercentChange(props: Props) {
  return (
    <Text
      style={{
        ...styles.percentChange,
        color: props.value >= 0 ? 'green' : 'red',
      }}
    >
      {props.value.toFixed(2)}%
    </Text>
  );
}

const styles = StyleSheet.create({
  percentChange: {
    fontSize: 14,
    fontWeight: 'light',
  },
});
