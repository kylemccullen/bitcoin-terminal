import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { useThemeColor } from '../hooks/useThemeColor';
import { RecommendedTransactionFee } from '../models/transaction-fee';
import getRecommendedTransactionFees from '../util/getRecommendedTransactionFees';
import PriorityItem from './priority-item';
import Card from './ui/card';
import { ThemedText as Text, ThemedText } from './ui/ThemedText';
import { ThemedView } from './ui/ThemedView';

export default function TransactionFee() {
  const [transactionFees, setTransactionFees] =
    useState<RecommendedTransactionFee | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const borderColor = useThemeColor('border');

  useEffect(() => {
    (async () => {
      setTransactionFees(await getRecommendedTransactionFees());
    })();
  }, []);

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction Fees</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons style={styles.infoIcon} name='information-circle-outline' color={Colors.lightText} size={24} />
        </TouchableOpacity>
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
          <View style={styles.modalContainer}>
            <ThemedView style={styles.modal}>
              <ThemedText style={[styles.modalHeader, { borderColor }]}>Recommended Transaction Fees</ThemedText>
              <ThemedText style={styles.modalContent}>Displays recommended transaction fees based on priority. Cost estimation denotes the average transaction size of 150 vB.</ThemedText>
              <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <ThemedText>OK</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </View>
        </Modal>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    maxWidth: 300
  },
  infoIcon: {
    maxWidth: 50
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    marginHorizontal: 30,
    borderRadius: 8,
    paddingVertical: 15
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: Colors.lightText,
    borderBottomWidth: 1
  },
  modalContent: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  actionContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
