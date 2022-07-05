import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import dayjs from 'dayjs';

export const chatCollection = new Mongo.Collection<Chat>('chats');

export const createDummyChatsData = (_ids: string[]): Chat[] => [
  {
    _id: 'chat-0',
    picture: '',
    title: 'title',
    participants: [_ids[0], _ids[1]],
    messages: ['msg-0'],
  },
  {
    _id: 'chat-1',
    picture: '',
    title: 'title',
    participants: [_ids[2], _ids[0]],
    messages: ['msg-1'],
  },
  {
    _id: 'chat-2',
    picture: '',
    title: 'title',
    participants: [_ids[1], _ids[2]],
    messages: ['msg-2'],
  },
];

if (Meteor.isServer) {
  Meteor.publish('chats.all', () => {
    return chatCollection.find();
  });
  Meteor.publish('chats.mine', () => {
    return chatCollection.find({
      participants: {
        $in: [Meteor.userId()],
      },
    });
  });
}
