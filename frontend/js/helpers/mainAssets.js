import _ from 'lodash';

import pairActivityMetrics from './activityMetrics';
import ObjectParser from './objectParser';
import pairSocialMetrics from './socialMetrics';
import pairTradingMetrics from './tradingMetrics';

export default class MainAsset {
  constructor(object, assets = []) {
    this.object = object;
    this.pairGroupList = {
      activity: [],
      social: [],
      trading: [],
    };
    this.pathObject = [];
    this.paths = ['BCH.data', 'BTC.data', 'DOGE.data', 'ETH.data', 'LTC.data'];
    if (assets?.length) {
      this.paths = this.paths.concat(assets);
    }
  }

  parsepair() {
    for (const path of this.paths) {
      const asset = new ObjectParser(_.get(this.object, path, '')).object[0];
      this.pairGroupList.activity.push(pairActivityMetrics(asset));
      this.pairGroupList.social.push(pairSocialMetrics(asset));
      this.pairGroupList.trading.push(pairTradingMetrics(asset));
      this.pathObject.push(asset);
    }
    return this.searchfield();
  }

  searchfield() {
    const field = [];
    for (const [index, activityMetric] of this.pairGroupList.activity.entries()) {
      field.push({
        name: activityMetric.pairs[0].right,
        symbol: activityMetric.pairs[1].right,
        data: activityMetric,
        socialData: this.pairGroupList.social[index],
        tradingData: this.pairGroupList.trading[index],
        obj: this.pathObject[index],
      });
    }
    return field;
  }
}
