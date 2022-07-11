import { Meteor } from 'meteor/meteor';
import { chatCollection } from './chats';
import { messageCollection } from './messages';

export const findChats = (): Chat[] => {
  return chatCollection
    .find()
    .fetch()
    .map((chat) => {
      const otherUserId = findOtherParticipantId(chat.participants);
      const { username, profile } = findUserById(otherUserId);
      return { ...chat, title: username, picture: profile.picture };
    });
};

const findOtherParticipantId = (participants: string[]): string => {
  const myId = Meteor.userId();
  let otherUserId: string;
  if (myId === participants[0]) {
    otherUserId = participants[1];
  } else {
    otherUserId = participants[0];
  }
  return otherUserId;
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
