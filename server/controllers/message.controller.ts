import Message from '../models/message.model';

export function insertMessage(req, res) {
  if (req.body.chatId && req.body.content && req.body.type && req.body.read) {
    const message = new Message({
      ...req.body,
      createdAt: new Date(),
      read: [req.body.senderId],
    });
    message
      .save()
      .then(() => res.status(201).json({ message: 'Message send' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function deleteMessage(req, res) {
  if (req.params.id) {
    Message.deleteOne({ _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: `Message ${req.params.id} deleted` })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function deleteMessagesForChat(req, res) {
  if (req.params.chatId) {
    Message.deleteMany({ chatId: req.params.chatId })
      .then(() =>
        res
          .status(200)
          .json({ message: `Messages deleted on chat ${req.params.chatId}` })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function updateMessage(req, res) {
  if (
    req.params.id &&
    req.body.chatId &&
    req.body.content &&
    req.body.createdAt &&
    req.body.type &&
    req.body.senderId &&
    req.body.read
  ) {
    const messageObject = { ...req.body };

    Message.updateOne(
      { _id: req.params.id },
      { ...messageObject, _id: req.params.id }
    )
      .then(() =>
        res.status(200).json({ message: `Message ${req.params.id} updated` })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function getMessagesForChat(req, res) {
  if (req.params.chatId) {
    Message.find({ chatId: req.params.chatId })
      .then((messages) => {
        res.status(200).json({ messages });
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function getAllMessages(req, res) {
  Message.find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
}
