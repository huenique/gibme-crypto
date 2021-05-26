"""
Lunarcrush client.

HTTP API-endpoint connections to lunarCRUSH.

Visit `https://lunarcrush.com/developers/docs#` for more information.
"""
from __future__ import annotations

import string
from typing import Optional

from . import utils

BASE_URL = 'https://api.lunarcrush.com/v2?'


class QueryFormatter(string.Formatter):
    def __init__(self, missing='', bad_fmt=''):
        self.missing = missing
        self.bad_fmt = bad_fmt
        self.fields = {}

    @staticmethod
    def cleanup(fmtd):
        if fmtd[-1:] == '&':
            return fmtd[:-1]
        else:
            return fmtd

    def get_field(self, field_name, args, kwargs):
        try:
            pairs = super().get_field(field_name, args, kwargs)
            key = pairs[0]
            if key:
                self.fields[key] = field_name
        except (KeyError, AttributeError):
            pairs = None, field_name
        return pairs

    def format_field(self, value, spec):
        if value == None:
            return self.missing
        try:
            if len(self.fields) == 1:
                return super().format_field(value, spec)
            else:
                return super().format_field(f'{self.fields[value]}={value}&',
                                            spec)
        except ValueError:
            if self.bad_fmt is not None:
                return self.bad_fmt
            else:
                raise


class AssetsEndpoint(QueryFormatter):
    """Details, overall metrics, and time series metrics for one or multiple
    cryptocurrencies.

    Usage:
    - https://api.lunarcrush.com/v2?data=assets?
    - https://api.lunarcrush.com/v2?data=assets&key=<key>&symbol=LTC
    """
    async def fetch_assets(
        self,
        loop,
        key: str,
        symbol: str,
        interval: Optional[str] = None,
        time_series_indicators: Optional[str] = None,
        change: Optional[str] = None,
        data_points: Optional[int] = None,
        start: Optional[int] = None,
        end: Optional[int] = None,
        output: Optional[str] = None,
    ) -> utils.objects.Response:
        url_args = {
            'base_url': BASE_URL,
            'data': 'assets',
            'key': key,
            'symbol': symbol,
            'interval': interval,
            'time_series_indicators': time_series_indicators,
            'change': change,
            'data_points': data_points,
            'start': start,
            'end': end
        }
        fmt = '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}{output}'
        url_query = await loop.run_in_executor(None, self.cleanup,
                                               self.format(fmt, **url_args))
        return await utils.get(uri=url_query, output=output)


class MarketPairsEndpoint(QueryFormatter):
    """Provides the exchange information for cryptocurrencies and the other
    cryptocurrencies they are being traded for.

    Usage:
    - https://api.lunarcrush.com/v2?data=market-pairs?
    """
    async def fetch_matket_pairs(
        self,
        loop,
        key: str,
        symbol: str,
        limit: Optional[int] = None,
        page: Optional[int] = None,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'market-pairs',
            'key': key,
            'symbol': symbol,
            'limit': limit,
            'page': page,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class MarketEndpoint(QueryFormatter):
    """Summary information for all supported cryptocurrencies including 5
    recent time series values for some metrics.
    """
    async def fetch_market(
        self,
        loop,
        key: str,
        type: Optional[int] = None,
        page: Optional[int] = None,
        sort: Optional[str] = None,
        desc: Optional[bool] = None,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'market',
            'key': key,
            'type': type,
            'page': page,
            'sort': sort,
            'desc': desc,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class GlobalEndpoint(QueryFormatter):
    """Overall aggregated metrics for all supported cryptocurrencies.
    """
    async def fetch_global(
        self,
        loop,
        key: str,
        interval: Optional[str] = None,
        change: Optional[str] = None,
        data_points: Optional[int] = None,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'global',
            'key': key,
            'interval': interval,
            'change': change,
            'data_points': data_points,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class MetaEndpoint(QueryFormatter):
    """Meta information for all supported assets
    """
    async def fetch_meta(
        self,
        loop,
        key: str,
        type: Optional[str] = None,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'meta',
            'key': key,
            'type': type,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class ExchangesEndpoint(QueryFormatter):
    """Meta information for all trackable exchanges.
    """
    async def fetch_exchanges(
        self,
        loop,
        key: str,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'exchanges',
            'key': key,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class ExchangeEnpoint(QueryFormatter):
    """Meta information and market pairs for a single exchange.
    """
    async def fetch_exchange(
        self,
        loop,
        key: str,
        exchange: str,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'exchange',
            'key': key,
            'exchange': exchange,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class CoinOfTheDayEndpoint(QueryFormatter):
    """The current coin of the day
    """
    async def fetch_cod(
        self,
        loop,
        key: str,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'coinoftheday',
            'key': key,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class CoinOfTheDayInfoEndpoint(QueryFormatter):
    """Provides the history of the coin of the day on LunarCRUSH when it was
    last changed, and when each coin was last coin of the day
    """
    async def fetch_cod_info(
        self,
        loop,
        key: str,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'coinoftheday_info',
            'key': key,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class FeedsEndpoint(QueryFormatter):
    """Social posts, news, and shared links for one or multiple coins.
    """
    async def fetch_feeds(
        self,
        loop,
        key: str,
        symbol: Optional[str] = None,
        sources: Optional[str] = None,
        limit: Optional[int] = None,
        page: Optional[int] = None,
        type: Optional[str] = None,
        start: Optional[int] = None,
        end: Optional[int] = None,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'feeds',
            'key': key,
            'symbol': symbol,
            'sources': sources,
            'limit': limit,
            'page': page,
            'type': type,
            'start': start,
            'end': end,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class InfluencersEndpoint(QueryFormatter):
    """List of social accounts that have the most influence on different assets
    based on number of followers, engegements, and volume of posts.
    """
    async def fetch_influencers(
        self,
        loop,
        key: str,
        symbol: Optional[str] = None,
        days: Optional[int] = None,
        num_days: Optional[int] = None,
        limit: Optional[int] = None,
        order_by: Optional[str] = None,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'influencers',
            'key': key,
            'symbol': symbol,
            'days': days,
            'num_days': num_days,
            'limit': limit,
            'order_by': order_by,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)


class InfluencerEndpoint(QueryFormatter):
    """Individual influencer details including actual posts.
    """
    async def fetch_influencer(
        self,
        loop,
        key: str,
        id: Optional[str] = None,
        screen_name: Optional[str] = None,
        days: Optional[str] = None,
        limit: Optional[str] = None,
        page: Optional[str] = None,
        output: Optional[str] = None,
    ):
        url_args = {
            'base_url': BASE_URL,
            'data': 'influencer',
            'key': key,
            'id': id,
            'screen_name': screen_name,
            'days': days,
            'limit': limit,
            'page': page,
        }
        url_query = self.cleanup(
            self.format(
                '{base_url}{data}{key}{symbol}{interval}{time_series_indicators}{change}{data_points}{start}{end}',
                **url_args))
        return await utils.get(url_query)
