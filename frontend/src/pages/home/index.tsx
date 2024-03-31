import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { StateProp } from '../../types';
import { Container } from 'react-bootstrap';
import { Dispatch } from 'redux';

import './style.scss';

type HomeProps = {};

const Home: FunctionComponent<HomeProps> = (props) => {
  return <Container>HOME</Container>;
};

const mapStateToProps = (state: StateProp) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
