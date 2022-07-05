import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import LeftPanel from '../../templates/LeftPanel';
import RightPanel from '../../templates/RightPanel';
import './styles.scss';

type MainProps = {};

const Main = (props: MainProps): JSX.Element => {
  const [ready, setReady] = React.useState(false);

  const handles = [
    Meteor.subscribe('chats.mine'),
    Meteor.subscribe('messages.all'),
  ];

  Tracker.autorun(() => {
    const areReady = handles.every((handle) => handle.ready());
    if (areReady) {
      setReady(true);
    }
  });

  if (!ready) {
    return null;
  } else {
    return (
      <div className="main">
        <LeftPanel />
        <RightPanel />
      </div>
    );
  }
};

export default Main;
