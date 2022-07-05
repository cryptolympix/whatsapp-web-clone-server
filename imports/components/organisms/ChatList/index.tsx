import React from 'react';

import ChatItem from '../../molecules/ChatItem';
import './styles.scss';

type ChatListProps = {
  chats: Chat[];
};

const ChatList = (props: ChatListProps): JSX.Element => {
  return (
    <div className="chatList">
      {props.chats.map((chat) => (
        <ChatItem key={chat._id} {...chat} />
      ))}
    </div>
  );
};

export default ChatList;
