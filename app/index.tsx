import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import BlockHeight from '../components/block-height';
import Price from '../components/price';
import PriceHistory from '../components/price-history';
import TransactionFee from '../components/transaction-fees';
import { ThemedView } from '../components/ui/ThemedView';
import { PriceProvider } from '../context/price-context';

export default function Index() {
  return (
    <PriceProvider>
      <ThemedView style={styles.wrapper} backgroundColorName="backdrop">
        <ScrollView>
          <View style={styles.cards}>
            <Price />
            <PriceHistory />
            <BlockHeight />
            <TransactionFee />
          </View>
        </ScrollView>
      </ThemedView>
    </PriceProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 60 : 20,
  },
  cards: {
    marginHorizontal: 20,
    display: 'flex',
    gap: 20,
  },
});
