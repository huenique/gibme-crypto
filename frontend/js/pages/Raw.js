import React from 'react';
import { Col } from 'react-bootstrap';

export default function DisplayRaw(rawData) {
  if (!rawData.object) {
    return null;
  }
  return (
    <Col className="border border-dark">
      <pre>{JSON.stringify(rawData, null, 2)}</pre>
    </Col>
  );
}
