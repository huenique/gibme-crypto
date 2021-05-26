"""
Transport adapters gibme-crypto uses to define and maintain connections.
"""

from __future__ import annotations

import asyncio
import socket
from typing import Any, Optional, Tuple

import websockets
from aiohttp import ClientResponse, ClientSession, ClientTimeout

TIMEOUT = ClientTimeout(total=60)
REPLY_TIMEOUT = 10
PING_TIMEOUT = 5
SLEEP_TIMEOUT = 5


class HTTPSessionAdapter:
    """ """
    def __init__(self, timeout=TIMEOUT):
        self.timeout = timeout

    async def get(self,
                  uri: str,
                  headers: Optional[Any] = None,
                  data: Optional[Any] = None) -> Tuple[ClientResponse, Any]:
        async with ClientSession(timeout=TIMEOUT) as session, \
            session.get(uri, data=data, headers=headers) as response:
            response.raise_for_status()
            return response, await response.json()

    async def post(self,
                   uri: str,
                   headers: Optional[Any] = None,
                   data: Optional[Any] = None) -> Tuple[ClientResponse, Any]:
        async with ClientSession(timeout=TIMEOUT) as session, \
            session.post(uri, data=data, headers=headers) as response:
            response.raise_for_status()
            return response, await response.json()


class WebSocketConnectionAdapter:
    def __init__(self,
                 reply_timeout=REPLY_TIMEOUT,
                 ping_timeout=PING_TIMEOUT,
                 sleep_time=SLEEP_TIMEOUT):
        self.reply_timeout = reply_timeout
        self.ping_timeout = ping_timeout
        self.sleep_time = sleep_time

    async def listen(self, uri, msg, callback):
        while True:
            try:
                async with websockets.connect(uri) as ws:
                    while True:
                        try:
                            await ws.send(msg)
                            reply = await asyncio.wait_for(
                                ws.recv(), timeout=self.reply_timeout)
                        except (asyncio.TimeoutError,
                                websockets.exceptions.ConnectionClosed):
                            try:
                                pong = await ws.ping()
                                await asyncio.wait_for(
                                    pong, timeout=self.ping_timeout)
                                continue
                            except:
                                await asyncio.sleep(self.sleep_time)
                                break
                        if callback:
                            callback(reply)
            except socket.gaierror:
                await asyncio.sleep(self.sleep_time)
                continue
            except ConnectionRefusedError:
                await asyncio.sleep(self.sleep_time)
                continue
