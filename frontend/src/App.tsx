import React, { FunctionComponent, useEffect } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect, useDispatch } from 'react-redux';
import { StateProp } from './types';

type AppProps = {
  isLoggedIn: boolean;
  error: string;
};

const App: FunctionComponent<AppProps> = (props) => {
  const { isLoggedIn, error } = props;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
      <ToastContainer autoClose={2000} pauseOnHover={true} />
    </>
  );
};

const mapStateToProps = (state: StateProp) => ({
  isLoggedIn: state.auth.isLoggedIn,
  error: state.home.error,
});

export default connect(mapStateToProps)(App);
