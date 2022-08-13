import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import Chat from '../models/chat.model';
import Message from '../models/message.model';
import User from '../models/user.model';
import {
  dummyUsers,
  createDummyChatsData,
  createDummyMessagesData,
} from './factory';

dotenv.config();

async function saveDummyChats(chats: Chat[]) {
  let promises: Promise<void>[] = [];

  chats.forEach((data) => {
    const chat = new Chat({ ...data });
    promises.push(
      new Promise<void>((resolve, reject) => {
        chat
          .save()
          .then(() => {
            console.log(`Chat ${data._id} saved`);
            resolve();
          })
          .catch(reject);
      })
    );
  });

  await Promise.all(promises);
}

async function saveDummyMessages(messages: Message[]) {
  let promises: Promise<void>[] = [];

  messages.forEach((data) => {
    const message = new Message({ ...data });
    promises.push(
      new Promise<void>((resolve, reject) => {
        message
          .save()
          .then(() => {
            console.log(`Message ${data._id} saved`);
            resolve();
          })
          .catch(reject);
      })
    );
  });

  await Promise.all(promises);
}

async function saveDummyUsers(users: User[]) {
  let promises: Promise<void>[] = [];

  users.forEach((data) => {
    const user = new User({ ...data });
    promises.push(
      new Promise<void>((resolve, reject) => {
        user
          .save()
          .then(() => {
            console.log(`User ${data._id} saved`);
            resolve();
          })
          .catch(reject);
      })
    );
  });

  await Promise.all(promises);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    // Delete all the data
    Chat.deleteMany()
      .then(() => console.log(`Delete all the chats from db`))
      .catch(console.error);
    Message.deleteMany()
      .then(() => console.log(`Delete all the messages from db`))
      .catch(console.error);
    User.deleteMany()
      .then(() => console.log(`Delete all the users from db`))
      .catch(console.error);

    const dummyChats = createDummyChatsData(dummyUsers);
    const dummyMessages = createDummyMessagesData(dummyUsers, dummyChats);

    await saveDummyUsers(dummyUsers);
    await saveDummyChats(dummyChats);
    await saveDummyMessages(dummyMessages);

    process.exit(0);
  })
  .catch(() => console.log('Connection to MongoDB failed!'));
