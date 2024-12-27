import axios from 'axios';
import { subDays, subHours, subMonths, subWeeks, subYears } from 'date-fns';
import { HistoryOption } from '../models/history-option';
import { API_KEY, API_URL } from '../secrets';
import { Currency } from '../models/currency';

var options: Record<HistoryOption, any> = {
  [HistoryOption.Hour]: {
    periodId: '2MIN',
    getStart: () => subHours(new Date(), 1),
  },
  [HistoryOption.Day]: {
    periodId: '1HRS',
    getStart: () => subDays(new Date(), 1),
  },
  [HistoryOption.Week]: {
    periodId: '8HRS',
    getStart: () => subWeeks(new Date(), 1),
  },
  [HistoryOption.Month]: {
    periodId: '1DAY',
    getStart: () => subMonths(new Date(), 1),
  },
  [HistoryOption.Year]: {
    periodId: '10DAY',
    getStart: () => subYears(new Date(), 1),
  },
};

const getPriceHistoryByOption = async (
  currency: Currency,
  option: HistoryOption
): Promise<number[]> => {
  try {
    const response = await axios.get(`${API_URL}/btc/${currency}/history`, {
      params: {
        period_id: options[option].periodId,
        time_start: options[option].getStart().toISOString(),
        time_end: new Date().toISOString(),
      },
      headers: {
        Accept: 'text/plain',
        'X-CoinAPI-Key': API_KEY,
      },
    });

    return response.data.map(
      (item: { rate_close: number }) => item.rate_close
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getPriceHistoryByOption;
