import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

import Login from './components/layouts/Login';
import Main from './components/layouts/Main';
import { ThemeContextProvider, ThemeContext } from './contexts/ThemeContext';

type AppProps = {};

const App = (props: AppProps): JSX.Element => {
  const { isDark } = React.useContext(ThemeContext);

  return (
    <ThemeContextProvider>
      <div className={`${isDark ? 'theme--dark' : 'theme--light'}`}>
        <div className="app">
          <div className="app__container">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chats" element={<Main />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default App;
