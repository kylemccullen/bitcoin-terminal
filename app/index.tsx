import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BlockHeight from '../components/block-height';
import Price from '../components/price';
import PriceHistory from '../components/price-history';
import TransactionFee from '../components/transaction-fees';
import { ThemedView } from '../components/ui/ThemedView';
import { PriceProvider } from '../context/price-context';

export default function Index(): React.JSX.Element {
  return (
    <PriceProvider>
      <ThemedView style={styles.wrapper} backgroundColorName="backdrop">
        <SafeAreaView>
          <ScrollView>
            <View style={styles.cards}>
              <Price />
              <PriceHistory />
              <BlockHeight />
              <TransactionFee />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </PriceProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10
  },
  cards: {
    marginHorizontal: 20,
    display: 'flex',
    gap: 20,
  },
});
