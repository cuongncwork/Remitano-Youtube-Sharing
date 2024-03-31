import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Header from '../components/header';
import Share from '../pages/share';
import { AuthActions } from '../core/adapters/redux/reducer/auth';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type RoutingProps = {
  checkLoggedIn: () => void;
};

const Routing = (props: RoutingProps) => {
  const { checkLoggedIn } = props;

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkLoggedIn: () => dispatch(AuthActions.checkLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
