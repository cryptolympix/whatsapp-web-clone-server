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

const PASSWORD = 'password';
const ID = Array(10)
  .fill(null)
  .map(() => mongoObjectId());

export const dummyUsers: User[] = [
  {
    _id: ID[0],
    username: 'Ethan',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[0]),
  },
  {
    _id: ID[1],
    username: 'Bryan',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[1]),
  },
  {
    _id: ID[2],
    username: 'Avery',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[2]),
  },
  {
    _id: ID[3],
    username: 'Katie',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[3]),
  },
  {
    _id: ID[4],
    username: 'Ray',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[4]),
  },
  {
    _id: ID[5],
    username: 'Samy',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[5]),
  },
  {
    _id: ID[6],
    username: 'John',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      status: "Salut j'utilise whatsapp",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[6]),
  },
  {
    _id: ID[7],
    username: 'Adrianna',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[7]),
  },
  {
    _id: ID[8],
    username: 'Julienne',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[8]),
  },
  {
    _id: ID[9],
    username: 'Marco',
    password: bcrypt.hashSync(PASSWORD, 10),
    profile: {
      phone: '+111111111',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      status: "Salut j'utilise WhatsApp !",
    },
    online: false,
    contacts: ID.filter((id) => id !== ID[9]),
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
