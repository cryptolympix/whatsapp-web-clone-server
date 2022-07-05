import React from 'react';
import { findChats } from '../../../api/helpers';
import './styles.scss';

import Header from '../../organisms/LeftPanelHeader';
import NotificationPanel from '../../organisms/NotificationPanel';
import SearchBarPanel from '../../organisms/SearchBarPanel';
import ChatList from '../../organisms/ChatList';

type LeftPanelProps = {};

const LeftPanel = (props: LeftPanelProps): JSX.Element => {
  return (
    <div className="leftPanel">
      <Header />
      <NotificationPanel />
      <SearchBarPanel />
      <ChatList chats={findChats()} />
    </div>
  );
};

export default LeftPanel;
