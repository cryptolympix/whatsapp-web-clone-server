import http from 'http';
import fs from 'fs';
import path from 'path';
import { Socket } from 'socket.io';

import app from './app';

const appDirectory = fs.realpathSync(process.cwd());
const imagesFolder = path.resolve(appDirectory, 'images');

// create images folder for multer
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
} else {
  fs.rmSync(imagesFolder, { recursive: true, force: true });
  fs.mkdirSync(imagesFolder);
}

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

const server = http.createServer(app);
const sio: Socket = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  },
});

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

sio.on('connection', (socket: Socket) => {
  console.log(`New connection socket : ${socket.id}`);

  socket.on('sendMessage', (message: Message) => {
    socket.broadcast.emit('sendMessageResponse', message);
  });

  socket.on('deleteMessage', (messageId: string) => {
    socket.broadcast.emit('deleteMessageResponse', messageId);
  });

  socket.on('deleteMessagesOnChat', (chatId: string) => {
    socket.broadcast.emit('deleteMessagesOnChatResponse', chatId);
  });

  socket.on('updateMessage', (message: Message) => {
    socket.broadcast.emit('updateMessageResponse', message);
  });

  socket.on('createChat', (chat: Chat) => {
    socket.broadcast.emit('createChatResponse', chat);
  });

  socket.on('deleteChat', (chatId: string) => {
    socket.broadcast.emit('deleteChatResponse', chatId);
  });

  socket.on('updateChat', (chat: Chat) => {
    socket.broadcast.emit('updateChatResponse', chat);
  });

  socket.on('loginUser', (userId: string) => {
    socket.broadcast.emit('loginUserResponse', userId);
  });

  socket.on('logoutUser', (userId: string) => {
    socket.broadcast.emit('logoutUserResponse', userId);
  });

  socket.on('updateUser', (user: User) => {
    socket.broadcast.emit('updateUserResponse', user);
  });

  socket.on('disconnect', () => {
    console.log(`Connection close on socket : ${socket.id}`);
    socket.disconnect();
  });
});

server.listen(port);
