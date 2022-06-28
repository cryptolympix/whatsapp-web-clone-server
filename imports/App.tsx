import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

import Login from './pages/Login';
import Main from './pages/Main';
import { ThemeContextProvider, ThemeContext } from './contexts/ThemeContext';

type AppProps = {};

const App = (props: AppProps): JSX.Element => {
  const { isDark } = React.useContext(ThemeContext);

  return (
    <ThemeContextProvider>
      <div className={`app ${isDark ? 'theme--dark' : 'theme--light'}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chats" element={<Main />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContextProvider>
  );
};

export default App;
