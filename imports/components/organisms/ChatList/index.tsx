import React from 'react';
import { findLastMessageOfChat } from '../../../api/helpers';
import dayjs from 'dayjs';

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
      {chats
        .sort((chat1, chat2) => {
          let lastMessageChat1 = findLastMessageOfChat(chat1._id);
          let lastMessageChat2 = findLastMessageOfChat(chat2._id);
          if (lastMessageChat1 && lastMessageChat2) {
            return (
              dayjs(lastMessageChat2.createdAt).valueOf() -
              dayjs(lastMessageChat1.createdAt).valueOf()
            );
          } else {
            return 0;
          }
        })
        .map((chat) => (
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
