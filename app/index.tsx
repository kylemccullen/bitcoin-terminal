import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import BlockHeight from '../components/block-height';
import Price from '../components/price';
import PriceHistory from '../components/price-history';
import TransactionFee from '../components/transaction-fees';
import { Colors } from '../constants/colors';

export default function Index() {
    return (
        <View style={styles.wrapper}>
            <ScrollView>
                <View style={styles.cards}>
                    <Price />
                    <PriceHistory />
                    <BlockHeight />
                    <TransactionFee />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Platform.OS == 'ios' ? 60 : 20,
    },
    cards: {
        marginHorizontal: 20,
        display: 'flex',
        gap: 20,
    },
});
