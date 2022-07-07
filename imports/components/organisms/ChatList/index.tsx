import React from 'react';

import ChatItem from '../../molecules/ChatItem';
import './styles.scss';

type ChatListProps = {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  chatSelected?: Chat | null;
};

const ChatList = ({
  chats,
  chatSelected,
  onSelectChat,
}: ChatListProps): JSX.Element => {
  return (
    <div className="chatList">
      {chats.map((chat) => (
        <ChatItem
          key={chat._id}
          {...chat}
          onSelectChat={onSelectChat}
          active={chatSelected !== null && chat._id === chatSelected._id}
        />
      ))}
    </div>
  );
};

export default ChatList;
