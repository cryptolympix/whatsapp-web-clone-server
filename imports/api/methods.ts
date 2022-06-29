import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.login': ({ username, phone, password }) => {
    const user = Accounts.findUserByUsername(username);
    let exist = !!user;
    if (exist) {
      console.log('User exists', user);
      return true;
    } else {
      console.log("User doesn't exist");
      return Accounts.createUser({
        username,
        password,
        profile: { phone, status: "Salut, j'utilise WhatsApp !" },
      });
    }
  },
});
