import Chat from '../models/chat.model';

export function createChat(req, res) {
  if (req.body.title && req.body.picture && req.body.participants) {
    const chatObject = req.file
      ? {
          ...JSON.parse(req.body),
          picture: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
          archived: false,
        }
      : { ...req.body, archived: false };
    const chat = new Chat(chatObject);
    chat
      .save()
      .then((chat) =>
        res.status(201).json({
          chat: {
            _id: chat._id,
            title: chat.title,
            picture: chat.picture,
            participants: chat.participants,
            archived: chat.archived,
          },
        })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function deleteChat(req, res) {
  if (req.params.id) {
    Chat.deleteOne({ _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: `Chat ${req.params.id} deleted` })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function updateChat(req, res) {
  if (
    req.params.id &&
    req.body.title &&
    req.body.picture &&
    req.body.participants &&
    typeof req.body.archived == 'boolean'
  ) {
    Chat.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: `Chat ${req.params.id} updated` })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function getChat(req, res) {
  if (req.params.id) {
    Chat.findOne({ _id: req.params.id })
      .then((chat) => res.status(200).json({ chat }))
      .catch((error) => res.status(404).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function getChatsOfUser(req, res) {
  if (req.params.userId) {
    Chat.find({
      participants: {
        $in: [req.params.userId],
      },
    })
      .then((chats) => res.status(200).json({ chats }))
      .catch((error) => res.status(404).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function getAllChats(req, res) {
  Chat.find({ _id: req.params.id })
    .then((chats) => res.status(200).json({ chats }))
    .catch((error) => res.status(404).json({ error }));
}
