import dayjs from 'dayjs';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { chatCollection } from './chats';

export const messageCollection = new Mongo.Collection<Message>('messages');

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
  Meteor.publish('messages.insert', (message: Message) => {
    return messageCollection.insert(message);
  });
}

Meteor.methods({
  'messages.insert': (message: Message) => {
    return messageCollection.insert(message);
  },
  'messages.delete': (_id: string) => {
    return messageCollection.remove({ _id });
  },
  'messages.update': (_id: string, newProps: Message) => {
    return messageCollection.update({ _id }, { ...newProps });
  },
});
