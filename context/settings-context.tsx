import * as SecureStore from 'expo-secure-store';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Currency } from '../models/currency';

interface Settings {
  currency: Currency;
}

interface SettingsContextType {
  settings?: Settings;
  setSettings?: Dispatch<SetStateAction<Settings>>;
}

export const SettingsContext = createContext<SettingsContextType>({});

export const SettingsProvider = ({ children }: any) => {
  const [settings, setSettings] = useState({
    currency: Currency.USD
  });

  useEffect(() => {
    (async () => {
      const result = await SecureStore.getItemAsync('settings');

      if (result !== null) {
        setSettings(JSON.parse(result) as Settings);
      }
    })();
  }, [])

  useEffect(() => {
    if (settings) {
      SecureStore.setItem('settings', JSON.stringify(settings));
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
