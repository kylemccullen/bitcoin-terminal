import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NumericFormat } from 'react-number-format';
import getPriceByTime from '../util/getPriceByTime';
import Card from './ui/card';
import PercentChange from './ui/percent-change';

export default function Price() {
    const [price, setPrice] = useState<number>(10);
    const [percentChange, setPercentChange] = useState<number>(5);

    useEffect(() => {
        (async () => {
            var currentPrice = await getPriceByTime();
            var priceOneDayAgo = await getPriceByTime(addDays(new Date(), -1));

            setPrice(currentPrice);
            setPercentChange((currentPrice / priceOneDayAgo - 1) * 100);
        })();
    }, []);

    return (
        <Card>
            <View style={styles.wrapper}>
                <View style={styles.price}>
                    <Image
                        source={require('@/assets/images/bitcoin-logo.png')}
                        style={styles.bitcoinLogo}
                    />
                    <NumericFormat
                        value={price.toFixed(2)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={(text) => (
                            <Text style={styles.priceText}>{text}</Text>
                        )}
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
