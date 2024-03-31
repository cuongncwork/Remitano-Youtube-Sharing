import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ShareParams, StateProp, User } from '../../types';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router';
import './style.scss';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { HomeActions } from '../../core/adapters/redux/reducer/home';

type ShareProps = {
  isLoggedIn: boolean;
  user: User;
  shareVideo: (params: ShareParams, callback: () => void) => void;
  loading: boolean;
};

const Share: FunctionComponent<ShareProps> = (props) => {
  const { isLoggedIn, user, shareVideo, loading } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const initState = {
    url: '',
  };

  const [initialValues] = useState(initState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
  });

  const onSubmit = (values: { url: string }) => {
    shareVideo({ video: { ...values, user_id: user.id } }, () => navigate('/'));
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md="10" lg="8" xl="6" className="offset-md-1 offset-lg-2 offset-xl-3">
          <div className="share-movie-container">
            <span className="share-movie-title">Share a Youtube movie</span>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group as={Row} className="mb-3 mt-3" controlId="formPlaintextPassword">
                <Form.Label column sm="4" md="3">
                  Youtube URL
                </Form.Label>
                <Col sm="8" md="9">
                  <Form.Control
                    type="text"
                    readOnly={loading}
                    {...register('url', {
                      required: 'URL required',
                      pattern: {
                        value:
                          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w]+\?v=|embed\/|live\/|v\/)?)([\w]+)(\S+)?$/,
                        message: 'Youtube URL invalid',
                      },
                    })}
                  />
                  {errors.url && (
                    <Form.Text className="text-danger header-error-message">
                      {errors.url.message}
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>
              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="text-nowrap header-button login-register-button"
                  disabled={loading}
                >
                  Share
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: StateProp) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  loading: state.home.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  shareVideo: (params: ShareParams, callback: () => void) =>
    dispatch(HomeActions.shareVideo(params, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
