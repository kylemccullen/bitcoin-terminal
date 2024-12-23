import { StyleSheet } from 'react-native';
import { ThemedView } from '../ui/ThemedView';

export default function Card(props: { children: any }) {
  return <ThemedView style={styles.card}>{props.children}</ThemedView>;
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
  },
});
