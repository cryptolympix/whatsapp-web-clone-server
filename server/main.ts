import { Meteor } from 'meteor/meteor';
import { chatCollection } from '../imports/api/chats';
import { messageCollection } from '../imports/api/messages';
import {
  insertDummyChats,
  insertDummyMessages,
  insertDummyUsers,
  dummyUsers,
  createDummyChatsData,
  createDummyMessagesData,
} from './initData';

// init methods
import '../imports/api/chats';
import '../imports/api/messages';
import '../imports/api/users';

Meteor.startup(() => {
  // ================================================ //
  // ============== Create the users ================ //
  // ================================================ //
  const numberUsers = Meteor.users.find().count();
  if (numberUsers === 0) {
    insertDummyUsers(dummyUsers);
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
  let users = [myUser, ...otherUsers];
  // ================================================ //
  // ============= Create the chats ================= //
  // ================================================ //
  const numberChats = chatCollection.find().count();
  if (numberChats === 0) {
    insertDummyChats(createDummyChatsData(users));
    console.log(`Dummy chats has been created`);
  } else {
    console.log(`There is ${numberChats} chats recorded`);
  }
  // ================================================ //
  // ============ Create the messages =============== //
  // ================================================ //
  const numberMessages = messageCollection.find().count();
  if (numberMessages === 0) {
    insertDummyMessages(createDummyMessagesData(users));
    console.log(`Dummy messages has been created`);
  } else {
    console.log(`There is ${numberMessages} messages recorded`);
  }
});
