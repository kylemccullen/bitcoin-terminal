import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { Colors } from '../constants/colors';
import getBlockHeight from '../util/getBlockHeight';
import Card from './ui/card';
import { ThemedText as Text } from './ui/ThemedText';

const BLOCK_HALVENING = 210000;

export default function Metrics() {
  const [blockHeight, setBlockHeight] = useState<number>(0);
  const [blocksToHalvening, setBlocksToHalvening] =
    useState<number>(BLOCK_HALVENING);

  useEffect(() => {
    (async () => {
      const blockHeightTemp = await getBlockHeight();
      setBlockHeight(blockHeightTemp);
      setBlocksToHalvening(
        BLOCK_HALVENING - (blockHeightTemp % BLOCK_HALVENING)
      );
    })();
  });

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.headerText}>Block Height</Text>
        <NumericFormat
          value={blockHeight}
          displayType={'text'}
          thousandSeparator={true}
          renderText={(text) => (
            <Text style={styles.headerValue}>{text}</Text>
          )}
        />
      </View>
      <View style={styles.bar}>
        <View
          style={{
            ...styles.fill,
            width: `${(1 - blocksToHalvening / BLOCK_HALVENING) * 100
              }%`,
          }}
        />
      </View>
      <View style={styles.remaining}>
        <NumericFormat
          value={blocksToHalvening}
          displayType={'text'}
          thousandSeparator={true}
          renderText={(text) => (
            <Text style={styles.remainingText}>
              {text} blocks until halvening
            </Text>
          )}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerText: {
    maxWidth: '40%',
    fontWeight: 'bold',
  },
  headerValue: {
    maxWidth: '60%',
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  bar: {
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    marginBottom: 6,
  },
  fill: {
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  remaining: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  remainingText: {
    maxWidth: '80%',
    color: Colors.lightText,
  },
});
