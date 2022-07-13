import React from 'react';

import ChatItem from '../ChatItem';
import ArchivePanel from '../ArchivePanel';
import './styles.scss';

type ChatListProps = {
  chats: Chat[];
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  chatSelected?: Chat | null;
  onClickArchive?: () => void;
};

const ChatList = ({
  chats,
  chatSelected,
  onSelectChat,
  onDeleteChat,
  onClickArchive,
}: ChatListProps): JSX.Element => {
  return (
    <div className="chatList">
      <ArchivePanel onClick={onClickArchive} />
      {chats.map((chat) => (
        <ChatItem
          key={chat._id}
          {...chat}
          onSelectChat={onSelectChat}
          onDeleteChat={onDeleteChat}
          active={chatSelected !== null && chat._id === chatSelected._id}
        />
      ))}
    </div>
  );
};

export default ChatList;
