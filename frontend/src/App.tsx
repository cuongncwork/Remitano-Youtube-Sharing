import React, { FunctionComponent, useEffect } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect, useDispatch } from 'react-redux';
import { StateProp, User, Video } from './types';
import consumer from './core/cable';
import { HomeActions } from './core/adapters/redux/reducer/home';

type AppProps = {
  isLoggedIn: boolean;
  user: User;
  error: string;
};

const App: FunctionComponent<AppProps> = (props) => {
  const { isLoggedIn, user, error } = props;

  const dispatch = useDispatch();

  const notificationToast = (data: Video) => (
    <div>
      User {data.user.email} shared new movie <strong>{data.title}</strong>
    </div>
  );

  useEffect(() => {
    if (isLoggedIn) {
      consumer.subscriptions.create(
        {
          channel: 'NotificationsChannel',
        },
        {
          connected: () => console.log('connected'),
          disconnected: () => console.log('disconnected'),
          received: (data: Video) => {
            const { user: receivedDataUser } = data;
            if (user.id !== receivedDataUser.id) {
              toast(notificationToast(data), {
                position: 'bottom-right',
              });
              dispatch(HomeActions.shareVideoSuccess(data));
            }
          },
        },
      );
    } else {
      consumer.disconnect();
    }

    return () => consumer.disconnect();
  }, [isLoggedIn, dispatch, user]);

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
  user: state.auth.user,
  error: state.home.error,
});

export default connect(mapStateToProps)(App);
