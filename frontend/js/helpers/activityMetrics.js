import _ from 'lodash';

export default function pairActivityMetrics(object) {
  const nf = new Intl.NumberFormat();
  const activePairs = [];
  const keys = [
    'name',
    'symbol',
    'price',
    'price_btc',
    'market_cap',
    'percent_change_24h',
    'percent_change_7d',
    'volume_24h',
    'max_supply',
  ];

  for (const key of keys) {
    activePairs.push(_.get(object, key));
  }

  const dataPairs = {
    pairs: [
      { id: 1, left: 'Name', right: activePairs[0] },
      { id: 2, left: 'Symbol', right: activePairs[1] },
      {
        id: 3,
        left: 'Price',
        right: `$${activePairs[2]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
      },
      { id: 4, left: 'Price/Bitcoin', right: activePairs[3] },
      {
        id: 5,
        left: 'Market Cap',
        right: `$${activePairs[4]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
      },
      { id: 6, left: '% Day', right: activePairs[5] },
      { id: 7, left: '% Week', right: activePairs[6] },
      {
        id: 8,
        left: 'Volume 24H',
        right: `$${activePairs[7]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
      },
      {
        id: 9,
        left: 'Max Supply',
        right: nf.format(activePairs[8]),
      },
    ],
  };
  return dataPairs;
}
