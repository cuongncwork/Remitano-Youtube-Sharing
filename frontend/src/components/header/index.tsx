import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { LoginParams, StateProp, User } from '../../types';
import { Button, Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { AuthActions } from '../../core/adapters/redux/reducer/auth';
import { Dispatch } from 'redux';
import { useForm } from 'react-hook-form';

type HeaderProps = {
  isLoggedIn: boolean;
  user?: User;
  signIn: (params: LoginParams) => void;
  signOut: () => void;
  isProcessing: boolean;
};

const Header: FunctionComponent<HeaderProps> = (props) => {
  const { isLoggedIn, user, signIn, signOut, isProcessing } = props;

  const initState = {
    email: '',
    password: '',
  };

  const [initialValues] = React.useState(initState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
  });

  const onSubmit = (values: LoginParams) => {
    signIn(values);
  };

  return (
    <Navbar expand="sm" className="header-container">
      <Container>
        <Navbar.Brand href="/" className="header-brand mt-1 d-flex align-items-center">
          <Icon.HouseFill size={26} className="me-2" /> Funny Videos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="mt-1">
          <Nav className="me-auto"></Nav>
          <Nav>
            {isLoggedIn ? (
              <Row className="d-flex align-items-center">
                <Col sm={12} md={12} lg={6} className="text-right mb-sm-2 mb-lg-0">
                  <span className="text-nowrap">Welcome: {user?.email}</span>
                </Col>
                <Col sm={12} md={12} lg={6} className="text-right">
                  <Link to={'share'}>
                    <Button
                      variant="primary"
                      className="text-nowrap header-button logout-button me-3"
                    >
                      Share a movie
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    className="text-nowrap header-button logout-button"
                    onClick={signOut}
                  >
                    Logout
                  </Button>
                </Col>
              </Row>
            ) : (
              <Form className="d-flex align-items-start" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="me-2" controlId="formBasicEmail">
                  <Form.Control
                    placeholder="Email"
                    {...register('email', {
                      required: 'Email required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email format invalid',
                      },
                    })}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger header-error-message">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="me-2" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                      required: 'Password required',
                      minLength: { value: 8, message: 'Password at least 8 characters' },
                      maxLength: { value: 30, message: 'Password up to 30 characters' },
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger header-error-message">
                      {errors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="text-nowrap header-button login-register-button"
                  disabled={isProcessing}
                >
                  Login / Register
                </Button>
              </Form>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state: StateProp) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  isProcessing: state.auth.isProcessing,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (params: LoginParams) => dispatch(AuthActions.signIn(params)),
  signOut: () => dispatch(AuthActions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
