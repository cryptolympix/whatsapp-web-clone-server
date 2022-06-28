import React from 'react';
import './styles.scss';

type FormLoginProps = {};

const FormLogin = (props: FormLoginProps): JSX.Element => {
  return (
    <div className="formLogin">
      <input
        className="formLogin__input"
        name="username"
        placeholder="Username"
      />
      <input
        className="formLogin__input"
        name="phone"
        placeholder="Phone Number"
      />
      <input
        className="formLogin__input"
        name="password"
        placeholder="Password"
      />
      <button className="formLogin__button">Connection</button>
    </div>
  );
};

export default FormLogin;
