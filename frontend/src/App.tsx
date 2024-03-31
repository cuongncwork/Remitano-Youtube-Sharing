import React, { FunctionComponent, useEffect } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes';
import { connect } from 'react-redux';
import { StateProp } from './types';

type AppProps = {};

const App: FunctionComponent<AppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

const mapStateToProps = (state: StateProp) => ({});

export default connect(mapStateToProps)(App);
