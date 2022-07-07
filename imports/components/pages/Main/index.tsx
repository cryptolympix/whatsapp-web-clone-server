import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { findChat } from '../../../api/helpers';

import LeftPanel from '../../templates/LeftPanel';
import RightPanel from '../../templates/RightPanel';
import './styles.scss';

type MainProps = {};

const Main = (props: MainProps): JSX.Element => {
  const [ready, setReady] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [chatVisible, setChatVisible] = React.useState<boolean>(false);
  const [chatSelected, setChatSelected] = React.useState<Chat | null>(null);

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

  // Programmatically login when we drop the login page
  React.useEffect(() => {
    const state = {
      username: 'Marco',
      phone: '+101010101',
      password: 'password',
    };
    Meteor.call('user.login', state, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
        Meteor.loginWithPassword(state.username, state.password, (err) => {
          if (err) {
            console.error(err);
          } else {
            setLogin(true);
            console.log(`Login successfully`);
          }
        });
      }
    });
  }, []);

  const handleChatSelection = (chatId: string) => {
    if (chatId) {
      setChatVisible(true);
      setChatSelected(findChat(chatId));
    }
  };

  if (!ready || !login) {
    return null;
  } else {
    return (
      <div className="main">
        <LeftPanel
          onSelectChat={handleChatSelection}
          chatSelected={chatSelected}
        />
        <RightPanel displayChat={chatVisible} chatSelected={chatSelected} />
      </div>
    );
  }
};

export default Main;
