import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  password: { type: String, required: true },
  profile: {
    type: {
      phone: { type: String, required: true },
      picture: { type: String, required: false },
      status: { type: String, required: true },
    },
    required: true,
  },
  contacts: { type: [String], required: true },
  online: { type: Boolean, required: true },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
