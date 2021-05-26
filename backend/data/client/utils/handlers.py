"""
Handlers invoked from higher level APIs.
"""
from __future__ import annotations

import asyncio
import json
from typing import Any, Union

from aiohttp.client_reqrep import ClientResponse

from . import adapters, db_files


class SessionHandler:
    def __init__(self):
        self.db = db_files.DatabaseFiles()
        self.sess = adapters.HTTPSessionAdapter()
        self.loop = asyncio.new_event_loop()
        self.resp = None
        self.json = None

    async def _make_request(self, **kwargs) -> Union[ClientResponse, None]:
        typ: Any = kwargs.get('type')
        uri = kwargs.get('uri')
        hed = kwargs.get('headers')
        dat = kwargs.get('data')

        if typ.lower() == 'get':
            self.resp, self.json = await self.sess.get(uri, hed, dat)
        elif typ.lower() == 'post':
            self.resp, self.json = await self.sess.post(uri, hed, dat)

        if await self.db.connect():
            await self.db.store(kwargs.get("output"), json.dumps(self.json))
        return self.resp


class WebSocketHandler:
    """
    Docs:
    - https://docs.python.org/3/glossary.html#term-asynchronous-generator

    Helpful discussions regarding the implementaion of this class:
    - https://stackoverflow.com/questions/52856569/async-for-loop-on-asyncgenerator
    - https://stackoverflow.com/questions/28115253/dynamically-add-to-list-of-what-python-asyncios-event-loop-should-execute
    """
    def __init__(self) -> None:
        # Example init variables:
        # self.client = adapters.WebSocketConnectionAdapter()
        # self.policy = asyncio.get_event_loop_policy()
        # self.new_loop = self.policy.new_event_loop()
        pass

    async def _connect(self, uri, msg) -> None:
        # Example implementation:
        # asyncio.set_event_loop(self.new_loop)
        # self.new_loop.run_until_complete(
        #     self.client.listen(uri, msg, self._save_reply))
        pass

    async def _save_reply(self, reply) -> None:
        # Keep open.
        # msgs_file = open('websocket_replies.txt', 'w+')
        # msgs_file.write(reply)
        pass
