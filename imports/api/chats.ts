import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

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
