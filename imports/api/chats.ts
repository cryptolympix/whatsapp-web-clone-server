import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { messageCollection } from './messages';

export const chatCollection = new Mongo.Collection<Chat>('chats');

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

Meteor.methods({
  'chats.create': (chat: Chat) => {
    return chatCollection.insert(chat);
  },
  'chats.delete': (_id: string) => {
    return (
      chatCollection.remove({ _id }) &&
      messageCollection.remove({ chatId: _id })
    );
  },
  'chats.update': (_id: string, newProps: Chat) => {
    return chatCollection.update({ _id }, { ...newProps });
  },
});
