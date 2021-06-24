import React from 'react';
import { Table } from 'react-bootstrap';

export default function MetricsTable(object) {
  function title(object) {
    if (!object.dataPairs) {
      return null;
    }
    return <h3>{object.tableName}</h3>;
  }

  return (
    <>
      {title(object)}
      <Table bordered hover responsive striped>
        <tbody>
          {object?.dataPairs?.pairs.map((dataset) => {
            const { id, left, right } = dataset;
            return (
              <tr key={id}>
                <td style={{ width: '40%' }}>{left}</td>
                <td>{right}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
