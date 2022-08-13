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
    username: 'Ethan Gonzalez',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+222222222',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: true,
  },
  {
    _id: mongoObjectId(),
    username: 'Bryan Wallace',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+333333333',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: true,
  },
  {
    _id: mongoObjectId(),
    username: 'Avery Stewart',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+444444444',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: true,
  },
  {
    _id: mongoObjectId(),
    username: 'Katie Peterson',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+555555555',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: true,
  },
  {
    _id: mongoObjectId(),
    username: 'Ray Edwards',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+666666666',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'Samy Smith',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+777777777',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
  },
  {
    _id: mongoObjectId(),
    username: 'John Smith',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+888888888',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise whatsapp",
    },
    online: true,
  },
  {
    _id: mongoObjectId(),
    username: 'Adrianna Scott',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+999999999',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: true,
  },
  {
    _id: mongoObjectId(),
    username: 'Julienne Smith',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+999999999',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: true,
  },
  {
    _id: mongoObjectId(),
    username: 'Marco',
    password: bcrypt.hashSync('password', 10),
    profile: {
      phone: '+101010101',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: true,
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
