import _ from 'lodash';

export default function pairTradingMetrics(object) {
  const activePairs = [];
  const columnsKeys = ['market_dominance', 'volatility'];

  for (const key of columnsKeys) {
    activePairs.push(_.get(object, key));
  }

  const dataPairs = {
    pairs: [
      {
        id: 1,
        left: 'Market Dominance',
        right: `${activePairs[0]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })}%`,
      },
      {
        id: 2,
        left: 'Volatility',
        right: `${activePairs[1]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })}%`,
      },
    ],
  };
  return dataPairs;
}
