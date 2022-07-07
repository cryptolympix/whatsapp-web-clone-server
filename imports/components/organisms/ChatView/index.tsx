import React from 'react';

import ChatHeader from '../ChatHeader';
import './styles.scss';

type ChatViewProps = {
  chat: Chat;
};

const ChatView = ({ chat }: ChatViewProps): JSX.Element => {
  return (
    <div className="chatView">
      <ChatHeader chat={chat} />
    </div>
  );
};

export default ChatView;
