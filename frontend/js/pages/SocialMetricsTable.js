import React from 'react';
import { Table } from 'react-bootstrap';

export default function SocialMetricsTable(dataPairs) {
  function title(object) {
    if (!object.dataPairs) {
      return null;
    }
    return <h3>Social Metrics</h3>;
  }

  return (
    <>
      {title(dataPairs)}
      <Table bordered hover responsive striped>
        <tbody>
          {dataPairs?.dataPairs?.pairs.map((dataset) => {
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
