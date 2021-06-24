import _ from 'lodash';

export default function pairSocialMetrics(object) {
  const nf = new Intl.NumberFormat();
  const activePairs = [];
  const keys = [
    'social_volume_calc_24h_percent',
    'social_score_calc_24h_percent',
    'social_contributors_calc_24h_percent',
    'social_dominance',
    'average_sentiment_calc_24h',
    'unique_url_shares',
    'tweets',
    'reddit_posts',
  ];

  for (const key of keys) {
    activePairs.push(_.get(object, key));
  }

  const dataPairs = {
    pairs: [
      {
        id: 1,
        left: 'Social Volume',
        right: `${activePairs[0]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })}%`,
      },
      {
        id: 2,
        left: 'Social Score',
        right: `${activePairs[1]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })}%`,
      },
      {
        id: 3,
        left: 'Social Contributors',
        right: `${activePairs[2]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })}%`,
      },
      {
        id: 4,
        left: 'Social Dominance',
        right: `${activePairs[3]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })}%`,
      },
      {
        id: 5,
        left: 'Average Sentiment',
        right: `${activePairs[4]?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })}%`,
      },
      { id: 6, left: 'Unique URL Shares', right: nf.format(activePairs[5]) },
      { id: 7, left: 'Tweets', right: nf.format(activePairs[6]) },
      { id: 8, left: 'Reddit Posts', right: nf.format(activePairs[7]) },
    ],
  };
  return dataPairs;
}
