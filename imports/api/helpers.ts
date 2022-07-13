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

export const findUserById = (_id: string): User => {
  // @ts-ignore
  return Meteor.users.findOne({ _id });
};

export const findMessageById = (_id: string): Message => {
  // @ts-ignore
  return messageCollection.findOne({ _id });
};

export const findMessageByChats = (_id: string): Message[] => {
  // @ts-ignore
  return messageCollection.find({ chatId: _id }).fetch();
};
