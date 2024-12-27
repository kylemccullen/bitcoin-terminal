import { StyleSheet, ViewProps } from 'react-native';
import { ThemedView } from '../ui/ThemedView';

export default function Card(props: ViewProps) {
  return (
    <ThemedView style={[styles.card, props.style]}>{props.children}</ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
  },
});
