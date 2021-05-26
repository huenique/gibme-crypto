"""
Tasks that we want to schedule and execute in the background.
"""

import asyncio

from . import lunarcrush
from .utils.locals import MAIN_ASSETS


def assets_main(*args, **kwargs):
    """Collect main supported assets"""
    key = kwargs.get('LUNARCRUSH_APIKEY')

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    aws = [
        _assets_main_callback(loop, key, asset, f'{asset}.json')
        for asset in MAIN_ASSETS
    ]
    loop.run_until_complete(asyncio.gather(*aws))


async def _assets_main_callback(lop, key, sym, out):
    await lunarcrush.AssetsEndpoint().fetch_assets(loop=lop,
                                                   key=key,
                                                   symbol=sym,
                                                   output=out)
