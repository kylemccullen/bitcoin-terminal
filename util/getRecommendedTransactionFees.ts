import { RecommendedTransactionFee } from '@/models/transaction-fee';
import mempoolJS from '@mempool/mempool.js';

const getRecommendedTransactionFees =
  async (): Promise<RecommendedTransactionFee> => {
    const {
      bitcoin: { fees },
    } = mempoolJS({
      hostname: 'mempool.space',
    });

    return (await fees.getFeesRecommended()) as RecommendedTransactionFee;
  };

export default getRecommendedTransactionFees;
