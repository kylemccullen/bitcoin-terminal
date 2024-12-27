export enum Currency {
  USD = 'usd',
  EUR = 'eur',
  GBP = 'gbp',
  JPY = 'jpy',
}

export const currencyOptions = {
  [Currency.USD]: {
    prefix: '$',
    suffix: '',
    fixed: 2,
  },
  [Currency.EUR]: {
    prefix: '€',
    suffix: '',
    fixed: 2,
  },
  [Currency.GBP]: {
    prefix: '£',
    suffix: '',
    fixed: 2,
  },
  [Currency.JPY]: {
    prefix: '',
    suffix: ' ¥',
    fixed: 0,
  },
};
