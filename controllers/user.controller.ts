import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export function loginUser(req, res) {
  if (req.body.password && req.body.username && req.body.phone) {
    User.findOne({
      username: req.body.username,
      'profile.phone': req.body.phone,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: `User not found` });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: 'password incorrect' });
            }
            User.updateOne(
              { username: req.body.username, 'profile.phone': req.body.phone },
              { online: true }
            )
              .then(() => {
                res.status(200).json({
                  userId: user._id,
                  token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                    expiresIn: '24h',
                  }),
                });
              })
              .catch((error) => res.status(500).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function logoutUser(req, res) {
  if (req.params.id) {
    User.updateOne({ _id: req.params.id }, { online: false })
      .then(() => res.status(200).json({ message: 'logout successfully' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function updateUser(req, res) {
  if (
    req.params.id &&
    req.body.username &&
    req.body.password &&
    req.body.profile &&
    typeof req.body.online === 'boolean'
  ) {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: `User ${req.params.id} updated` })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function getUser(req, res) {
  if (req.params.id) {
    User.findById(req.params.id)
      .then((user) => res.status(200).json({ user }))
      .catch((error) => res.status(404).json({ error }));
  } else {
    res.status(400).json({ message: 'bad mandatory' });
  }
}

export function getAllUsers(req, res) {
  User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(404).json({ error }));
}

export function getTestUser(req, res) {
  User.find()
    .then((users) => res.status(200).json({ user: users[0] }))
    .catch((error) => res.status(404).json({ error }));
}
