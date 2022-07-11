import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import './App.scss';

import Main from './components/pages/Main';
import { ThemeContextProvider, ThemeContext } from './contexts/ThemeContext';

type AppProps = {};

const App = (props: AppProps): JSX.Element => {
  const usersLoading = useTracker(() => {
    const handle = Meteor.subscribe('users.all');
    return !handle.ready();
  }, []);

  if (usersLoading) {
    return <div />;
  }

  return (
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {({ isDark }) => (
          <div className={`${isDark ? 'theme--dark' : 'theme--light'}`}>
            <div className="app">
              <div className="app__background">
                <div className="app__background app__background--top"></div>
                <div className="app__background app__background--bottom"></div>
              </div>
              <div className="app__container">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  );
};

export default App;
