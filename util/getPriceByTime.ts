import axios from 'axios';
import { Currency } from '../models/currency';
import { API_KEY, API_URL } from '../secrets';

const getPriceByTime = async (currency: Currency | undefined, date?: Date | null): Promise<number> => {
  const response = await axios.get(`${API_URL}/btc/${currency}`, {
    params: {
      time: date?.toISOString(),
    },
    headers: {
      Accept: 'text/plain',
      'X-CoinAPI-Key': API_KEY,
    },
  });

  return response.data.rate;
};

export default getPriceByTime;
