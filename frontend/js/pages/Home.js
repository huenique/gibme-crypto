import Fuse from 'fuse.js';
import _ from 'lodash';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Col,
  Container,
  Modal,
  Row,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import BasicNavbar from '../components/Navbars/Navbar';
import { fetch } from '../store/rest_check';

import DisplayRaw from '../components/Raw';
import SocialMetricsTable from '../components/SocialMetricsTable';
import TradingMetricsTable from '../components/TradingMetricsTable';

import MainAsset from '../helpers/mainAssets';

const Home = () => {
  const [modal, setModalShow] = useState(false);
  const [dropSocialMetrics, setDropSocialMetrics] = useState(false);
  const [dropTradingMetrics, setDropTradingMetrics] = useState(false);
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets);
  useEffect(() => {
    const action = fetch.fetchAssets();
    dispatch(action);
  }, [dispatch]);

  const coins = new MainAsset(assets).parsepair()
  const options = {
    keys: ['name', 'symbol'],
  };

  const fuse = new Fuse(coins, options);
  const results = fuse.search(query);
  const dataPairs = _.get(results[0], 'item.data');
  const dataSocialPairs = _.get(results[0], 'item.socialData');
  const dataTradingPairs = _.get(results[0], 'item.tradingData');
  const dataObjects = _.get(results[0], 'item.obj');

  function searchData({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  function toggle() {
    setShow((wasOpened) => !wasOpened);
  }

  function toggleSocialMetricsDropdown() {
    setDropSocialMetrics((wasOpened) => !wasOpened);
  }

  function toggleTradingMetricsDropdown() {
    setDropTradingMetrics((wasOpened) => !wasOpened);
  }

  function toggleScroll(object) {
    if (object) {
      return null;
    }
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
    return null;
  }

  function toggleSmdWrapper() {
    toggleSocialMetricsDropdown();
    toggleScroll(show);
  }

  function toggleTmdWrapper() {
    toggleTradingMetricsDropdown();
    toggleScroll(show);
  }

  function toggleButtons(object) {
    if (!object) {
      return null;
    }
    return (
      <ToggleButtonGroup className="mb-4" name="metrics" size="sm" type="checkbox">
        <ToggleButton variant="secondary" onChange={toggleSmdWrapper}>
          Social Metrics
        </ToggleButton>
        <ToggleButton variant="secondary" onChange={toggleTmdWrapper}>
          Trading Metrics
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }

  function tableActivityTitle(object) {
    if (object) {
      return <h3>Activity</h3>;
    }
    return null;
  }

  function emptyTable(object) {
    if (!object) {
      return <h3 className="text-center p-5 m-5">It feels empty here...</h3>;
    }
    return null;
  }

  function basicTable(object) {
    return (
      <Table bordered hover responsive striped>
        <tbody>{object}</tbody>
      </Table>
    );
  }

  return (
    <>
      <BasicNavbar />
      <Container fluid style={{ paddingTop: '60px' }}>
        <Row className="flex-xl-nowrap">
          <Col>
            <Modal centered show={modal} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h1>
                    <span aria-label="sparkles" role="img">
                      ✨
                    </span>
                    Welcome!
                    <span aria-label="sparkles" role="img">
                      ✨
                    </span>
                  </h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  This is our home page where our favorite coins live. Do note that this app is
                  considered a minimum viable product (MVP), our assets are limited to the
                  cryptocurrencies we have selected.{' '}
                  <p className="mt-3">
                    We currently support:
                    <br />
                    <span aria-label="checkmarkbutton" role="img">
                      ✅
                    </span>{' '}
                    Bitcoin
                    <br />
                    <span aria-label="checkmarkbutton" role="img">
                      ✅
                    </span>{' '}
                    Bitcoin Cash
                    <br />
                    <span aria-label="checkmarkbutton" role="img">
                      ✅
                    </span>{' '}
                    DogeCoin
                    <br />
                    <span aria-label="checkmarkbutton" role="img">
                      ✅
                    </span>{' '}
                    Etherium
                    <br />
                    <span aria-label="checkmarkbutton" role="img">
                      ✅
                    </span>{' '}
                    Litecoin
                    <p className="mt-3">
                      This project is being developed at: https://github.com/huenique/gibme-crypto
                    </p>
                  </p>
                </p>
              </Modal.Body>
            </Modal>
            <div className="container" style={{ paddingTop: '40px' }}>
              <Form>
                <Form.Label className="mt-2">
                  <span aria-label="chart" role="img">
                    📉
                  </span>
                  We are low on coins!{' '}
                </Form.Label>
                <Button className="ml-2 mb-2" size="sm" variant="light" onClick={handleShow}>
                  Why?
                </Button>
                <Form.Row>
                  <Col sm="4">
                    <Form.Control
                      placeholder="Search for coins"
                      value={query}
                      onChange={searchData}
                    />
                  </Col>
                </Form.Row>
              </Form>
            </div>
            <div className="container" style={{ paddingTop: '40px' }}>
              <Form.Group>
                <Form.Check
                  disabled={!dataPairs}
                  id="rawdata"
                  label={<Form.Label>Show raw data</Form.Label>}
                  type="checkbox"
                  onClick={toggle}
                />
              </Form.Group>
              {tableActivityTitle(dataPairs)}
              {emptyTable(dataPairs)}
              {basicTable(
                dataPairs?.pairs.map((dataset) => {
                  const { id, left, right } = dataset;
                  return (
                    <tr key={id}>
                      <td style={{ width: '40%' }}>{left}</td>
                      <td>{right}</td>
                    </tr>
                  );
                })
              )}
              {toggleButtons(dataPairs)}
              {dropSocialMetrics && <SocialMetricsTable dataPairs={dataSocialPairs} />}
              {dropTradingMetrics && <TradingMetricsTable dataPairs={dataTradingPairs} />}
              <div className="mt-5 pt-5"> </div>
            </div>
          </Col>
          {show && <DisplayRaw object={dataObjects} />}
        </Row>
      </Container>
    </>
  );
};

export default Home;
