import { Meteor } from 'meteor/meteor';
import { createDummyUsers } from '../imports/api/helpers';
import { dummyUsers } from '../imports/api/users';

Meteor.startup(() => {
  const numberUsers = Meteor.users.find().count();
  if (numberUsers === 0) {
    createDummyUsers(dummyUsers);
    console.log(`Dummy users has been created`);
  } else {
    console.log(`There is ${numberUsers} users recorded`);
  }
});
