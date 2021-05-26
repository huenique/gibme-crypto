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

// import CustomNavigation from '../components/Drawer/CustomDrawer';
import BasicNavbar from '../components/Navbars/Navbar';
import { fetch } from '../store/rest_check';
import pairActivity from '../utils/pairs';
import pairSocialMetrics from '../utils/pairsSocialMetrics';
import pairTradingMetrics from '../utils/pairsTradingMetrics';
import ObjectParser from '../utils/parseObject';

import DisplayRaw from './Raw';
import SocialMetricsTable from './SocialMetricsTable';
import TradingMetricsTable from './TradingMetricsTable';

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
  // Main assets data
  // Assets & objects
  const bchObj = new ObjectParser(_.get(assets, 'BCH.data', '')).object[0];
  const btcObj = new ObjectParser(_.get(assets, 'BTC.data', '')).object[0];
  const dogeObj = new ObjectParser(_.get(assets, 'DOGE.data', '')).object[0];
  const ethObj = new ObjectParser(_.get(assets, 'ETH.data', '')).object[0];
  const ltcObj = new ObjectParser(_.get(assets, 'LTC.data', '')).object[0];

  const mainAssetColumns = [
    'name',
    'symbol',
    'price',
    'price_btc',
    'market_cap',
    'percent_change_24h',
    'percent_change_7d',
    'volume_24h',
    'max_supply',
  ];

  const bchActivePairs = [];
  const btcActivePairs = [];
  const dogeActivePairs = [];
  const ethctivePairs = [];
  const ltcActivePairs = [];

  for (const key of mainAssetColumns) {
    bchActivePairs.push(_.get(bchObj, key));
    btcActivePairs.push(_.get(btcObj, key));
    dogeActivePairs.push(_.get(dogeObj, key));
    ethctivePairs.push(_.get(ethObj, key));
    ltcActivePairs.push(_.get(ltcObj, key));
  }

  // BCH
  const bchName = _.get(bchObj, 'name');
  const bchSymbol = _.get(bchObj, 'symbol');

  // BTC
  const btcName = _.get(btcObj, 'name');
  const btcSymbol = _.get(btcObj, 'symbol');

  // DOGE
  const dogeName = _.get(dogeObj, 'name');
  const dogeSymbol = _.get(dogeObj, 'symbol');

  // ETH
  const ethName = _.get(ethObj, 'name');
  const ethSymbol = _.get(ethObj, 'symbol');

  // LTC
  const ltcName = _.get(ltcObj, 'name');
  const ltcSymbol = _.get(ltcObj, 'symbol');

  // First Table, Activity
  const bchPairs = pairActivity(bchActivePairs);
  const btcPairs = pairActivity(btcActivePairs);
  const dogePairs = pairActivity(dogeActivePairs);
  const ethPairs = pairActivity(ethctivePairs);
  const ltcPairs = pairActivity(ltcActivePairs);

  // Second Table, Social Metrics
  const bchSocialPairs = pairSocialMetrics(bchObj);
  const btcSocialPairs = pairSocialMetrics(btcObj);
  const dogeSocialPairs = pairSocialMetrics(dogeObj);
  const ethSocialPairs = pairSocialMetrics(ethObj);
  const ltcSocialPairs = pairSocialMetrics(ltcObj);

  // Second Table, Social Metrics
  const bchTradingPairs = pairTradingMetrics(bchObj);
  const btcTradingPairs = pairTradingMetrics(btcObj);
  const dogeTradingPairs = pairTradingMetrics(dogeObj);
  const ethTradingPairs = pairTradingMetrics(ethObj);
  const ltcTradingPairs = pairTradingMetrics(ltcObj);

  const coins = [
    {
      name: bchName,
      symbol: bchSymbol,
      data: bchPairs,
      socialData: bchSocialPairs,
      tradingData: bchTradingPairs,
      obj: bchObj,
    },
    {
      name: btcName,
      symbol: btcSymbol,
      data: btcPairs,
      socialData: btcSocialPairs,
      tradingData: btcTradingPairs,
      obj: btcObj,
    },
    {
      name: dogeName,
      symbol: dogeSymbol,
      data: dogePairs,
      socialData: dogeSocialPairs,
      tradingData: dogeTradingPairs,
      obj: dogeObj,
    },
    {
      name: ethName,
      symbol: ethSymbol,
      data: ethPairs,
      socialData: ethSocialPairs,
      tradingData: ethTradingPairs,
      obj: ethObj,
    },
    {
      name: ltcName,
      symbol: ltcSymbol,
      data: ltcPairs,
      socialData: ltcSocialPairs,
      tradingData: ltcTradingPairs,
      obj: ltcObj,
    },
  ];

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
