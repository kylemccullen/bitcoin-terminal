import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { RecommendedTransactionFee } from '../models/transaction-fee';
import getRecommendedTransactionFees from '../util/getRecommendedTransactionFees';
import PriorityItem from './priority-item';
import Card from './ui/card';

export default function TransactionFee() {
    const [transactionFees, setTransactionFees] =
        useState<RecommendedTransactionFee | null>(null);

    useEffect(() => {
        (async () => {
            setTransactionFees(await getRecommendedTransactionFees());
        })();
    }, []);

    return (
        <Card>
            <Text style={styles.headerText}>Transaction Fees</Text>
            <View style={styles.items}>
                <PriorityItem
                    style={styles.item}
                    titleText="No Priority"
                    backgroundColor={Colors.background}
                    value={transactionFees?.economyFee}
                />
                <PriorityItem
                    style={styles.item}
                    titleText="Low"
                    backgroundColor="#A8D08D"
                    value={transactionFees?.hourFee}
                />
                <PriorityItem
                    style={styles.item}
                    titleText="Medium"
                    backgroundColor="#F1E2B3"
                    value={transactionFees?.halfHourFee}
                />
                <PriorityItem
                    style={styles.item}
                    titleText="High"
                    backgroundColor="#D97F6C"
                    value={transactionFees?.fastestFee}
                />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
    },
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: '50%',
    },
});
