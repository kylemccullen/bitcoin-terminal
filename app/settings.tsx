import React, { useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../components/ui/card';
import { ThemedText as Text } from '../components/ui/ThemedText';
import { ThemedView } from '../components/ui/ThemedView';
import { Colors } from '../constants/colors';
import { SettingsContext } from '../context/settings-context';
import { Currency } from '../models/currency';

export default function Settings(): React.JSX.Element {
  const { settings, setSettings } = useContext(SettingsContext);

  return (
    <ThemedView
      style={styles.wrapper}
      backgroundColorName="backdrop"
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.cards}>
            <Card>
              <Text style={styles.headerText}>Currrency</Text>
              <View style={styles.options}>
                {Object.values(Currency).map(
                  (option: Currency, index: number): React.JSX.Element => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={() =>
                          setSettings?.({ ...settings, currency: option })
                        }
                      >
                        <View style={[styles.checkbox]}>
                          {settings?.currency === option && (
                            <View style={styles.checked} />
                          )}
                        </View>
                        <Text style={styles.optionText}>
                          {option.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    paddingBottom: 30,
    height: '100%',
  },
  cards: {
    marginHorizontal: 20,
    display: 'flex',
    gap: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    height: 10,
    width: 10,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  optionText: {},
});
