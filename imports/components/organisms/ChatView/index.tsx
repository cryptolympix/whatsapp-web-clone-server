import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import dayjs from 'dayjs';
import uniqid from 'uniqid';
import { messageCollection } from '../../../api/messages';

import ChatHeader from '../ChatHeader';
import ChatFooter from '../ChatFooter';
import MessageView from '../MessageView';
import './styles.scss';

type ChatViewProps = {
  chat: Chat;
};

const ChatView = ({ chat }: ChatViewProps): JSX.Element => {
  let messages = useTracker(() =>
    messageCollection.find({ chatId: chat._id }).fetch()
  );

  const sendMessage = (messageContent: string) => {
    let message: Message = {
      _id: uniqid(),
      chatId: chat._id,
      content: messageContent,
      createdAt: dayjs().toDate(),
      senderId: Meteor.userId(),
      read: [],
      type: 'TEXT',
    };
    Meteor.call('messages.insert', message, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Send message successfully`);
      }
    });
  };

  return (
    <div className="chatView">
      <ChatHeader className="chatView__header" chat={chat} />
      <MessageView messages={messages} />
      <ChatFooter className="chatView__footer" onSendClick={sendMessage} />
    </div>
  );
};

export default ChatView;
