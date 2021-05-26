export default function pairActivity(dataArr) {
  const nf = new Intl.NumberFormat();
  const dataPairs = {
    pairs: [
      { id: 1, left: 'Name', right: dataArr[0] },
      { id: 2, left: 'Symbol', right: dataArr[1] },
      {
        id: 3,
        left: 'Price',
        right: `$${dataArr[2]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
      },
      { id: 4, left: 'Price/Bitcoin', right: dataArr[3] },
      {
        id: 5,
        left: 'Market Cap',
        right: `$${dataArr[4]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
      },
      { id: 6, left: '% Day', right: dataArr[5] },
      { id: 7, left: '% Week', right: dataArr[6] },
      {
        id: 8,
        left: 'Volume 24H',
        right: `$${dataArr[7]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
      },
      {
        id: 9,
        left: 'Max Supply',
        right: nf.format(dataArr[8]),
      },
    ],
  };
  return dataPairs;
}
