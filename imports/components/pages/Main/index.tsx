import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { findChat, findChats } from '../../../api/helpers';

import LeftPanel from '../../templates/LeftPanel';
import RightPanel from '../../templates/RightPanel';
import './styles.scss';

type MainProps = {};

const Main = (props: MainProps): JSX.Element => {
  const [login, setLogin] = React.useState(false);
  const [chatVisible, setChatVisible] = React.useState<boolean>(false);
  const [chatSelected, setChatSelected] = React.useState<Chat | null>(null);

  const loading = useTracker(() => {
    const handles = [
      Meteor.subscribe('chats.mine'),
      Meteor.subscribe('messages.all'),
    ];
    return !handles.every((handle) => handle.ready());
  });

  // Programmatically login when we drop the login page
  React.useEffect(() => {
    const state = {
      username: 'Marco',
      phone: '+101010101',
      password: 'password',
    };
    Meteor.call('users.login', state, (err, res) => {
      if (err) {
        console.error(err);
      } else {
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

  const handleChatDelete = (chatId: string) => {
    if (chatSelected._id === chatId && chatVisible) {
      console.log('hello');
      setChatSelected(null);
      setChatVisible(false);
    }
  };

  if (loading || !login) {
    return <div className="main" />;
  } else {
    return (
      <div className="main">
        <LeftPanel
          onSelectChat={handleChatSelection}
          onDeleteChat={handleChatDelete}
          chatSelected={chatSelected}
        />
        <RightPanel
          displayChat={chatVisible}
          chatSelected={chatSelected}
          onDeleteChat={handleChatDelete}
        />
      </div>
    );
  }
};

export default Main;
