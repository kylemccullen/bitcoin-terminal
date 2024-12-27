import { addDays } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { PriceContext } from '../context/price-context';
import { SettingsContext } from '../context/settings-context';
import getPriceByTime from '../util/getPriceByTime';
import Card from './ui/card';
import CurrencyText from './ui/currency-text';
import PercentChange from './ui/percent-change';
import { ThemedText as Text } from './ui/ThemedText';

export default function Price() {
  const { price, setPrice } = useContext(PriceContext);
  const { settings } = useContext(SettingsContext);
  const [percentChange, setPercentChange] = useState<number>(5);

  useEffect(() => {
    (async () => {
      var currentPrice = await getPriceByTime(settings?.currency);
      var priceOneDayAgo = await getPriceByTime(
        settings?.currency,
        addDays(new Date(), -1)
      );

      setPrice?.(currentPrice);
      setPercentChange((currentPrice / priceOneDayAgo - 1) * 100);
    })();
  }, [settings?.currency]);

  return (
    <Card>
      <View style={styles.wrapper}>
        <View style={styles.price}>
          <Image
            source={require('../assets/images/bitcoin-logo.png')}
            style={styles.bitcoinLogo}
          />
          <CurrencyText
            style={styles.priceText}
            value={price}
            currency={settings?.currency!}
          />
        </View>
        <View style={styles.percentChange}>
          <PercentChange value={percentChange} />
          <Text>24h</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bitcoinLogo: {
    width: 30,
    height: 30,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  percentChange: {
    flexDirection: 'row',
    gap: 8,
  },
});
