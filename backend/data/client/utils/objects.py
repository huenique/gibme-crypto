from dataclasses import dataclass


@dataclass
class Response(object):
    connection = None
    content = None
    cookies = None
    headers = None
    method = None
    reason = None
    status = None
    ok = None
    url = None

    def __init__(self, resobj=None) -> None:
        self.object = None

        if hasattr(resobj, '__class__'):
            try:
                self.connection = resobj.connection
                self.content = resobj.content
                self.cookies = resobj.cookies
                self.headers = resobj.headers
                self.method = resobj.method
                self.reason = resobj.reason
                self.status = resobj.status
                self.ok = resobj.ok
                self.url = resobj.url
            except AttributeError as attrb:
                self.object = attrb
            except Exception as err:
                pass
        else:
            self.object = None

        self._return_object()

    def _return_object(self):
        return self.object
