"""
Session and Connection objects to manage request and connection settings.
"""

from __future__ import annotations

from . import handlers, objects


class Session(handlers.SessionHandler):
    async def request(self,
                      type,
                      uri,
                      headers=None,
                      data=None,
                      output=None) -> objects.Response:
        res = await self._make_request(
            **{
                'type': type,
                'uri': uri,
                'headers': headers,
                'data': data,
                'output': output,
            })
        return objects.Response(res)


class WebSocket(handlers.WebSocketHandler):
    async def start_connection(self, uri: str, msg: str):
        return 'Not Implemented'
        # self._connect(uri, msg)
