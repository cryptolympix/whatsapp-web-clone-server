import { User } from './models';
import { Accounts } from 'meteor/accounts-base';

export const createDummyUsers = (users: User[]): void => {
  users.forEach((user) => {
    const { _id, password, username, profile } = user;
    Accounts.createUser({
      username,
      password,
      profile,
    });
  });
};
