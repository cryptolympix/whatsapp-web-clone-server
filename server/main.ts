import { Meteor } from 'meteor/meteor';
import { createDummyUsers } from '../imports/api/helpers';
import '../imports/api/methods'; // Init the meteor methods

Meteor.startup(() => {
  const numberUsers = Meteor.users.find().count();
  if (numberUsers === 0) {
    const users = require('../imports/api/users.json').users;
    createDummyUsers(users);
    console.log(`Dummy users has been created`);
  } else {
    console.log(`There is ${numberUsers} users recorded`);
  }
});
