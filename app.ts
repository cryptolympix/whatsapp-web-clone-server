import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';
import chatRoutes from './routes/chat.routes';
import messageRoutes from './routes/message.routes';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connect to MongoDB successfully!'))
  .catch(() => console.log('Connection to MongoDB failed!'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/ping', (req, res) => res.send('hello'));

export default app;
