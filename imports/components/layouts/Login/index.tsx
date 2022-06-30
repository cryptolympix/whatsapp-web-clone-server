import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../../contexts/ThemeContext';
import FormLogin from '../../molecules/FormLogin';
import './styles.scss';

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
        <ThemeContext.Consumer>
          {({ isDark }) => (
            <img
              alt="background"
              className="login__image"
              src={
                isDark
                  ? './images/connection-dark.jpg'
                  : './images/connection.jpg'
              }
            />
          )}
        </ThemeContext.Consumer>
        <h3 className="login__title">Gardez votre téléphone connecté</h3>
        <p className="login__p">
          Connectez vous afin de lancer une conversation !
        </p>
        <div className="login__divider"></div>
        <FormLogin onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
