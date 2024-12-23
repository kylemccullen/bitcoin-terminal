import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/colors';

interface Props {
  width: number;
  height: number;
  data: number[];
}

export default function Chart(props: Props) {
  return (
    <View style={{ overflow: 'hidden' }}>
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: props.data,
            },
          ],
        }}
        width={props.width}
        height={props.height}
        yAxisInterval={1}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        withDots={false}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => Colors.primary,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginLeft: -53,
        }}
      />
    </View>
  );
}
