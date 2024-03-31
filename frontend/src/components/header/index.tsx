import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { StateProp } from '../../types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Dispatch } from 'redux';

type HeaderProps = {};

const Header: FunctionComponent<HeaderProps> = (props) => {
  return (
    <Navbar expand="sm" className="header-container">
      <Container>
        <Navbar.Brand href="/" className="header-brand mt-1 d-flex align-items-center">
          <Icon.HouseFill size={26} className="me-2" /> Funny Videos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="mt-1">
          <Nav className="me-auto"></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state: StateProp) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
