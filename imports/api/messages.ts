import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { chatCollection } from './chats';
import dayjs from 'dayjs';

export const messageCollection = new Mongo.Collection<Message>('messages');

export const createDummyMessagesData = (users: Meteor.User[]): Message[] => [
  {
    _id: 'msg-0',
    chatId: 'chat-0',
    content: 'Salut !',
    createdAt: dayjs().toDate(),
    read: [],
    type: 'TEXT',
    senderId: users[0]._id,
  },
  {
    _id: 'msg-1',
    chatId: 'chat-1',
    content: 'Salut !',
    createdAt: dayjs().subtract(2, 'year').toDate(),
    read: [],
    type: 'TEXT',
    senderId: users[2]._id,
  },
  {
    _id: 'msg-2',
    chatId: 'chat-2',
    content: 'Salut !',
    createdAt: dayjs().subtract(1, 'year').toDate(),
    read: [],
    type: 'TEXT',
    senderId: users[1]._id,
  },
];

if (Meteor.isServer) {
  Meteor.publish('messages.all', () => {
    return messageCollection.find();
  });
  Meteor.publish('messages.mine', (chatId) => {
    const chats = chatCollection
      .find({
        participants: {
          $in: [Meteor.userId()],
        },
      })
      .fetch()
      .map((chat) => chat._id);

    return messageCollection.find({
      chatId: { $in: chats },
    });
  });
}
