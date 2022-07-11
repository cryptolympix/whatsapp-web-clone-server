import dayjs from 'dayjs';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { chatCollection } from '../imports/api/chats';
import { messageCollection } from '../imports/api/messages';

export const insertDummyUsers = (users: User[]): void => {
  users.forEach((user) => {
    const { _id, password, username, profile } = user;
    Accounts.createUser({
      username,
      password,
      profile,
    });
  });
};

export const insertDummyChats = (chats: Chat[]): void => {
  chats.forEach((chat) => {
    chatCollection.insert(chat);
  });
};

export const insertDummyMessages = (messages: Message[]): void => {
  messages.forEach((message) => {
    messageCollection.insert(message);
  });
};

// ==============================================================================

export const dummyUsers: User[] = [
  {
    _id: 'user-0',
    username: 'Ethan Gonzalez',
    password: 'password',
    profile: {
      phone: '+222222222',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-1',
    username: 'Bryan Wallace',
    password: 'password',
    profile: {
      phone: '+333333333',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-2',
    username: 'Avery Stewart',
    password: 'password',
    profile: {
      phone: '+444444444',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-3',
    username: 'Katie Peterson',
    password: 'password',
    profile: {
      phone: '+555555555',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-4',
    username: 'Ray Edwards',
    password: 'password',
    profile: {
      phone: '+666666666',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-5',
    username: 'Samy Smith',
    password: 'password',
    profile: {
      phone: '+777777777',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-6',
    username: 'John Smith',
    password: 'password',
    profile: {
      phone: '+888888888',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise whatsapp",
    },
  },
  {
    _id: 'user-7',
    username: 'Adrianna Scott',
    password: 'password',
    profile: {
      phone: '+999999999',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-8',
    username: 'Julienne Smith',
    password: 'password',
    profile: {
      phone: '+999999999',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
  {
    _id: 'user-9',
    username: 'Marco',
    password: 'password',
    profile: {
      phone: '+101010101',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
  },
];

export const createDummyChatsData = (users: Meteor.User[]): Chat[] => [
  {
    _id: 'chat-0',
    picture: users[1].profile.picture,
    title: 'Chat 0',
    participants: [users[0]._id, users[1]._id],
  },
  {
    _id: 'chat-1',
    picture: users[2].profile.picture,
    title: 'Chat 1',
    participants: [users[2]._id, users[0]._id],
  },
  {
    _id: 'chat-2',
    picture: users[2].profile.picture,
    title: 'Chat 2',
    participants: [users[1]._id, users[2]._id],
  },
];

export const createDummyMessagesData = (users: Meteor.User[]): Message[] => [
  {
    _id: 'msg-0',
    chatId: 'chat-0',
    content: 'Salut !',
    createdAt: dayjs().subtract(2, 'day').toDate(),
    read: [users[1]._id],
    type: 'TEXT',
    senderId: users[0]._id,
  },
  {
    _id: 'msg-1',
    chatId: 'chat-1',
    content: 'Salut !',
    createdAt: dayjs().subtract(2, 'year').toDate(),
    read: [],
    type: 'TEXT',
    senderId: users[2]._id,
  },
  {
    _id: 'msg-2',
    chatId: 'chat-2',
    content: 'Salut !',
    createdAt: dayjs().subtract(1, 'year').toDate(),
    read: [],
    type: 'TEXT',
    senderId: users[1]._id,
  },
  {
    _id: 'msg-3',
    chatId: 'chat-0',
    content: 'Salut !',
    createdAt: dayjs().subtract(1, 'day').toDate(),
    read: [users[0]._id],
    type: 'TEXT',
    senderId: users[1]._id,
  },
];
