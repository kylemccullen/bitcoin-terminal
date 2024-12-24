import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface PriceContextType {
  price?: number;
  setPrice?: Dispatch<SetStateAction<number>>;
}

export const PriceContext = createContext<PriceContextType>({});

export const PriceProvider = ({ children }: any) => {
  const [price, setPrice] = useState(500);

  return (
    <PriceContext.Provider value={{ price, setPrice }}>
      {children}
    </PriceContext.Provider>
  );
}
