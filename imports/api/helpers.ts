import dayjs from 'dayjs';
import { Meteor } from 'meteor/meteor';
import { chatCollection } from './chats';
import { messageCollection } from './messages';

export const findChats = (): Chat[] => {
  return chatCollection
    .find()
    .fetch()
    .map((chat) => {
      const otherUserId = findOtherParticipantIdOfChat(chat.participants);
      const { username, profile } = findUserById(otherUserId);
      return { ...chat, title: username, picture: profile.picture };
    });
};

export const findOtherParticipantIdOfChat = (
  participants: string[]
): string => {
  const myId = Meteor.userId();
  if (myId === participants[0]) {
    return participants[1];
  } else {
    return participants[0];
  }
};

export const findOtherParticipantOfChat = (
  participants: string[]
): Meteor.User => {
  const myId = Meteor.userId();
  if (myId === participants[0]) {
    return Meteor.users.findOne({ _id: participants[1] });
  } else {
    return Meteor.users.findOne({ _id: participants[0] });
  }
};

export const findChat = (_id: string): Chat => {
  return chatCollection.findOne({ _id });
};

export const findUserById = (_id: string): Meteor.User => {
  return Meteor.users.findOne({ _id });
};

export const findMessageById = (_id: string): Message => {
  return messageCollection.findOne({ _id });
};

export const findMessageByChats = (_id: string): Message[] => {
  return messageCollection.find({ chatId: _id }).fetch();
};

export const findLastMessageOfChat = (chatId: string): Message | null => {
  if (messageCollection.find().count() > 0) {
    return messageCollection
      .find({ chatId })
      .fetch()
      .sort(
        (msg1, msg2) =>
          dayjs(msg1.createdAt).valueOf() - dayjs(msg2.createdAt).valueOf()
      )
      .slice(-1)[0];
  } else {
    return null;
  }
};
