import { Meteor } from 'meteor/meteor';
import { dummyUsers } from '../imports/api/users';
import { chatCollection, createDummyChatsData } from '../imports/api/chats';
import {
  messageCollection,
  createDummyMessagesData,
} from '../imports/api/messages';
import {
  createDummyUsers,
  createDummyChats,
  createDummyMessages,
} from '../imports/api/helpers';

import '../imports/api/users'; // Init the meteor methods

Meteor.startup(() => {
  // ================================================ //
  // ============== Create the users ================ //
  // ================================================ //

  const numberUsers = Meteor.users.find().count();

  if (numberUsers === 0) {
    createDummyUsers(dummyUsers);
    console.log(`Dummy users has been created`);
  } else {
    console.log(`There is ${numberUsers} users recorded`);
  }

  // ===================================================== //
  // ==== Select ids to create the chats and messages ==== //
  // ===================================================== //

  let myUser = Meteor.users.findOne({ username: 'Marco' });
  let otherUsers = Meteor.users
    .find({
      username: {
        $ne: 'Marco',
      },
    })
    .fetch()
    .sort(() => Math.random() - 0.5)
    .slice(-2);

  let ids = [myUser._id, ...otherUsers.map((u) => u._id)];

  // ================================================ //
  // ============= Create the chats ================= //
  // ================================================ //

  const numberChats = chatCollection.find().count();

  if (numberChats === 0) {
    createDummyChats(createDummyChatsData(ids));
    console.log(`Dummy chats has been created`);
  } else {
    console.log(`There is ${numberChats} chats recorded`);
  }

  // ================================================ //
  // ============ Create the messages =============== //
  // ================================================ //

  const numberMessages = messageCollection.find().count();

  if (numberMessages === 0) {
    createDummyMessages(createDummyMessagesData(ids));
    console.log(`Dummy messages has been created`);
  } else {
    console.log(`There is ${numberMessages} messages recorded`);
  }
});
