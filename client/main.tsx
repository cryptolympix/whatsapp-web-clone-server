import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Tracker } from 'meteor/tracker';
import App from '../imports/App';

Meteor.startup(() => {
  Tracker.autorun(() => {
    const userReady: boolean = Meteor.subscribe('users.all').ready();
    if (userReady) {
      render(<App />, document.getElementById('root'));
    } else {
      console.log('users not ready');
    }
  });
});
