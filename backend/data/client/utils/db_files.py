from typing import Any, Literal, Union

import psycopg2

from gibme_crypto.settings.base import DB_URL

from . import queries


class DatabaseFiles:
    def __init__(self):
        self.query = queries.ClientQueries
        self.db = DB_URL
        self.conn = None
        self.curr = None

    async def _exists(self, datum_name: str) -> str:
        """Check if a row with datum_name exists.

        Args:
            datum_name (str): Column row name.

        Returns:
            The specified datum_name value, None otherwise.
        """
        self.curr.execute(self.query.select_exists, (datum_name, ))
        datum_name = self.curr.fetchone()[0]
        return datum_name

    async def close(self):
        """Close the connection now. Wraps psycog's close() method.
        """
        try:
            self.conn.close()
            self.curr.close()
        except (Exception, psycopg2.DatabaseError) as error:
            return None
        return True

    async def connect(self) -> Union[Exception, Any, Literal[True]]:
        """Create a new database session. Wraps psycog's connect() method.
        """
        try:
            self.conn = psycopg2.connect(self.db)
            self.curr = self.conn.cursor()
            self.curr.execute(self.query.create)
        except (Exception, psycopg2.DatabaseError) as error:
            return None
        return True

    async def fetch(
            self, datum_name: str) -> Union[Exception, Any, "tuple[Any, str]"]:
        """Perform a SELECT statement with datum_name.

        Args:
            datum_name (str): Column row name.

        Returns:
            Values of a column row.
        """
        try:
            self.curr.execute(self.query.select, (datum_name, ))
            datum, datum_name = self.curr.fetchone()
        except (Exception, psycopg2.DatabaseError) as error:
            return None
        return datum, datum_name

    async def store(self, datum_name: str,
                    datum: Any) -> Union[Exception, Any]:
        """Perform an INSERT statement.

        Args:
            datum_name (str): The value for the column datum_name.
            datum (str): A JSON object.

        Returns:
            A row ID if successful.
        """
        try:
            exists = await self._exists(datum_name)
            if exists:
                self.curr.execute(self.query.update, (
                    datum,
                    datum_name,
                ))
            else:
                self.curr.execute(self.query.insert, (
                    datum_name,
                    datum,
                ))
            file_id = self.curr.fetchone()[0]
            self.conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            return error
        return file_id
