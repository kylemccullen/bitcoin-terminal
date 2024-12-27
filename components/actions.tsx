import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText as Text } from '../components/ui/ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';
import Card from './ui/card';

interface Screen {
  name: string;
  route: '/settings';
  icon: any;
}

const screens: Screen[] = [
  {
    name: 'Settings',
    route: '/settings',
    icon: 'settings-outline',
  },
];

export default function Actions(): React.JSX.Element {
  const textColor = useThemeColor('text');
  const borderColor = useThemeColor('border');
  const router = useRouter();

  return (
    <Card style={styles.wrapper}>
      {screens.map((screen: Screen, index: number) => {
        return (
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            key={index}
            style={[
              styles.navigation,
              index !== screens.length - 1
                ? { borderBottomWidth: 1, borderColor }
                : {},
            ]}
          >
            <View style={styles.header}>
              <Ionicons
                name={screen.icon}
                size={18}
                color={textColor}
              />
              <Text style={styles.headerText}>{screen.name}</Text>
            </View>
            <Ionicons
              style={styles.icon}
              name="arrow-forward"
              size={18}
              color={textColor}
            />
          </TouchableOpacity>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
  },
  navigationWrapper: {},
  navigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  notLastNavigation: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: '80%',
  },
  headerText: {
    fontWeight: 'bold',
  },
  icon: {
    maxWidth: '20%',
  },
});
