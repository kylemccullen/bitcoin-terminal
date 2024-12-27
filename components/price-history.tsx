import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SettingsContext } from '../context/settings-context';
import { useThemeColor } from '../hooks/useThemeColor';
import { HistoryOption } from '../models/history-option';
import getPriceHistoryByOption from '../util/getPriceHistoryByOption';
import Card from './ui/card';
import Chart from './ui/chart';
import CurrencyText from './ui/currency-text';
import PercentChange from './ui/percent-change';
import { ThemedText as Text } from './ui/ThemedText';

export default function PriceHistory() {
  const { settings } = useContext(SettingsContext);
  const historyOptions = Object.values(HistoryOption);
  const [selectedOption, setSelectedOption] = useState<HistoryOption>(
    HistoryOption.Day
  );
  const [data, setData] = useState<number[]>([]);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const result = await getPriceHistoryByOption(
        settings?.currency!,
        selectedOption
      );
      setData(result);
      const priceChangeTemp = result[result.length - 1] - result[0];
      setPriceChange(priceChangeTemp);
      setPriceChangePercent((priceChangeTemp / result[0]) * 100);
    })();
  }, [selectedOption, settings?.currency]);

  const getColor = (option: HistoryOption) => {
    return useThemeColor(
      option === selectedOption ? 'activeBackground' : 'background'
    );
  };

  return (
    <Card>
      <View style={styles.wrapper}>
        <View style={styles.overview}>
          <View style={styles.priceChange}>
            <FontAwesome6
              name={priceChange > 0 ? 'arrow-trend-up' : 'arrow-trend-down'}
              color={useThemeColor('text')}
            />
            <CurrencyText
              style={styles.priceChangeText}
              value={Math.abs(priceChange)}
              currency={settings?.currency!}
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
          {historyOptions.map((option: HistoryOption, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedOption(option)}
              >
                <Text
                  style={{
                    ...styles.option,
                    backgroundColor: getColor(option),
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
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
