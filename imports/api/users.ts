import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.publish('users.all', () => {
    return Meteor.users.find(
      {},
      {
        fields: { service: 0 },
      }
    );
  });
}

Meteor.methods({
  'users.login': ({ username, phone, password }) => {
    const user = Accounts.findUserByUsername(username);
    let exist = !!user;
    if (exist) {
      console.log('User exists', user);
      return true;
    } else {
      console.log("User doesn't exist");
      return false;
      // return Accounts.createUser({
      //   username,
      //   password,
      //   profile: { phone, status: "Salut, j'utilise WhatsApp !" },
      // });
    }
  },
  'users.logout': ({ username, phone, password }) => {
    const user = Accounts.findUserByUsername(username);
    let exist = !!user;
    if (exist) {
      console.log('User exists', user);
      return true;
    } else {
      console.log("User doesn't exist");
      return false;
      // return Accounts.createUser({
      //   username,
      //   password,
      //   profile: { phone, status: "Salut, j'utilise WhatsApp !" },
      // });
    }
  },
  'users.update': (username: string, newProps: Meteor.User) => {
    const user = Accounts.findUserByUsername(username);
    let exist = !!user;
    if (exist) {
      Meteor.users.update({ username }, { ...user, ...newProps });
    }
  },
});
