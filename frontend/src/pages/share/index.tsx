import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StateProp } from '../../types';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router';
import './style.scss';
import { Container } from 'react-bootstrap';

type ShareProps = {};

const Share: FunctionComponent<ShareProps> = (props) => {
  return <Container>SHARE</Container>;
};

const mapStateToProps = (state: StateProp) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
