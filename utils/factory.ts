import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

export function mongoObjectId() {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
}

export const dummyUsers: User[] = [
  {
    _id: mongoObjectId(),
    username: 'Ethan',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Bryan',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Avery',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Katie',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Ray',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Samy',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'John',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise whatsapp",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Adrianna',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Julienne',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Marco',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
];

export const createDummyChatsData = (users: User[]): Chat[] => [
  {
    _id: mongoObjectId(),
    picture: users[1].profile.picture,
    title: 'Chat 0',
    participants: [users[0]._id, users[1]._id],
    archived: false,
  },
  {
    _id: mongoObjectId(),
    picture: users[2].profile.picture,
    title: 'Chat 1',
    participants: [users[2]._id, users[0]._id],
    archived: false,
  },
  {
    _id: mongoObjectId(),
    picture: users[2].profile.picture,
    title: 'Chat 2',
    participants: [users[1]._id, users[2]._id],
    archived: false,
  },
];

export const createDummyMessagesData = (
  users: User[],
  chats: Chat[]
): Message[] => [
  {
    _id: mongoObjectId(),
    chatId: chats[0]._id,
    content: {
      text: 'Salut !',
      pictureUrl: '',
      audioUrl: '',
    },
    createdAt: dayjs().subtract(2, 'day').toDate(),
    read: [users[1]._id],
    type: 'TEXT',
    senderId: users[0]._id,
  },
  {
    _id: mongoObjectId(),
    chatId: chats[1]._id,
    content: {
      text: 'Salut !',
      pictureUrl: '',
      audioUrl: '',
    },
    createdAt: dayjs().subtract(2, 'year').toDate(),
    read: [],
    type: 'TEXT',
    senderId: users[2]._id,
  },
  {
    _id: mongoObjectId(),
    chatId: chats[2]._id,
    content: {
      text: 'Salut !',
      pictureUrl: '',
      audioUrl: '',
    },
    createdAt: dayjs().subtract(1, 'year').toDate(),
    read: [],
    type: 'TEXT',
    senderId: users[1]._id,
  },
  {
    _id: mongoObjectId(),
    chatId: chats[0]._id,
    content: {
      text: 'Salut !',
      pictureUrl: '',
      audioUrl: '',
    },
    createdAt: dayjs().subtract(1, 'day').toDate(),
    read: [users[0]._id],
    type: 'TEXT',
    senderId: users[1]._id,
  },
];
