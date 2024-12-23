import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import { HistoryOption } from '../models/history-option';
import getPriceHistoryByOption from '../util/getPriceHistoryByOption';
import Card from './ui/card';
import Chart from './ui/chart';
import PercentChange from './ui/percent-change';

export default function PriceHistory() {
  const historyOptions = Object.values(HistoryOption);
  const [selectedOption, setSelectedOption] = useState<HistoryOption>(
    HistoryOption.Day
  );
  const [data, setData] = useState<number[]>([]);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const result = await getPriceHistoryByOption(selectedOption);
      setData(result);
      const priceChangeTemp = result[result.length - 1] - result[0];
      setPriceChange(priceChangeTemp);
      setPriceChangePercent((priceChangeTemp / result[0]) * 100);
    })();
  }, [selectedOption]);

  return (
    <Card>
      <View style={styles.wrapper}>
        <View style={styles.overview}>
          <View style={styles.priceChange}>
            <FontAwesome6
              name={
                priceChange > 0
                  ? 'arrow-trend-up'
                  : 'arrow-trend-down'
              }
            />
            <NumericFormat
              value={Math.abs(priceChange)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              decimalScale={2}
              renderText={(text) => (
                <Text style={styles.priceChangeText}>
                  {text}
                </Text>
              )}
            />
          </View>
          <PercentChange value={priceChangePercent} />
        </View>
        <View style={styles.chart}>
          {data.length !== 0 && (
            <Chart
              width={Dimensions.get('window').width}
              height={230}
              data={data}
            />
          )}
        </View>
        <View style={styles.options}>
          {historyOptions.map(
            (option: HistoryOption, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedOption(option)}
                >
                  <Text
                    style={{
                      ...styles.option,
                      backgroundColor:
                        option === selectedOption
                          ? '#E8EAED'
                          : 'white',
                    }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    gap: 20,
    height: 280,
  },
  overview: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceChangeText: {
    fontSize: 16,
    fontWeight: 500,
  },
  chart: {
    flex: 1,
  },
  options: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
