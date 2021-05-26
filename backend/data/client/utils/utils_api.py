"""
API implementation for chart.client.utils.
"""

from __future__ import annotations

from typing import Any, Dict, Optional, Union

from . import objects, sessions


async def _request(type, uri, headers, data, output):
    session = sessions.Session()
    return await session.request(type, uri, headers, data, output)


async def _ws_connection(uri, msg):
    ws_conn = sessions.WebSocket()
    ws_conn.start_connection(uri, msg)


async def get(uri: str,
              headers: Union[Dict[str, Any], Any, None] = None,
              data: Union[Dict[str, Any], Any, None] = None,
              output: Optional[str] = None) -> objects.Response:
    return await _request(uri=uri,
                          headers=headers,
                          data=data,
                          type='GET',
                          output=output)


async def post(uri: str,
               headers: Union[Dict[str, Any], Any, None] = None,
               data: Union[Dict[str, Any], Any, None] = None,
               output: Optional[str] = None) -> objects.Response:
    return await _request(uri=uri,
                          headers=headers,
                          data=data,
                          type='POST',
                          output=output)


async def connect(uri: str, msg: Any):
    _ws_connection(uri, msg)
