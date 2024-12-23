import mempoolJS from '@mempool/mempool.js';

const getBlockHeight = async (): Promise<number> => {
  const {
    bitcoin: { blocks },
  } = mempoolJS({
    hostname: 'mempool.space',
  });

  return await blocks.getBlocksTipHeight();
};

export default getBlockHeight;
