class ClientQueries:
    create = "CREATE TABLE IF NOT EXISTS data_data (id SERIAL PRIMARY KEY, datum_name TEXT NOT NULL, datum JSON NOT NULL);"
    insert = "INSERT INTO data_data(id, datum_name, datum) VALUES (DEFAULT,%s,%s) RETURNING datum_name"
    select = "SELECT datum, datum_name FROM data_data WHERE datum_name = %s"
    select_exists = "SELECT EXISTS (SELECT 1 FROM data_data WHERE datum_name = %s)"
    update = "UPDATE data_data SET datum = %s WHERE datum_name = %s RETURNING datum_name;"
