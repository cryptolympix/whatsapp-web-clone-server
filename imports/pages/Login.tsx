import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

import FormLogin from '../components/FormLogin';
import './Login.scss';

type LoginProps = {};

const Login = (props: LoginProps): JSX.Element => {
  const navigate = useNavigate();

  const handleLogin = (state: {
    username: string;
    phone: string;
    password: string;
  }) => {
    const { username, password } = state;
    Meteor.call('user.login', state, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
        Meteor.loginWithPassword(username, password, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Login successfully`);
            navigate('./chats');
          }
        });
      }
    });
  };

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
        <FormLogin onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
