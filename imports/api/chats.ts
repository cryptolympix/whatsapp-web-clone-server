import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const chatCollection = new Mongo.Collection<Chat>('chats');

export const createDummyChatsData = (users: Meteor.User[]): Chat[] => [
  {
    _id: 'chat-0',
    picture: users[1].profile.picture,
    title: 'Chat 0',
    participants: [users[0]._id, users[1]._id],
    messages: ['msg-0'],
  },
  {
    _id: 'chat-1',
    picture: users[2].profile.picture,
    title: 'Chat 1',
    participants: [users[2]._id, users[0]._id],
    messages: ['msg-1'],
  },
  {
    _id: 'chat-2',
    picture: users[2].profile.picture,
    title: 'Chat 2',
    participants: [users[1]._id, users[2]._id],
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
