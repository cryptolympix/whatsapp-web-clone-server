import React from 'react';
import FormLogin from '../components/FormLogin';
import './Login.scss';

type LoginProps = {};

const Login = (props: LoginProps): JSX.Element => {
  return (
    <div className="login">
      <div className="login__container">
        <img
          alt="background"
          className="login__image"
          src="./images/connection.jpg"
        />
        <h3 className="login__title">Keep your phone connected</h3>
        <p className="login__p">Connect you to open the app</p>
        <div className="login__divider"></div>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
