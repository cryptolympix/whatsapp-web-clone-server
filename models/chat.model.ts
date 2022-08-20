import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const chatSchema = new mongoose.Schema({
  title: { type: String, required: false },
  picture: { type: String, required: false },
  participants: { type: [String], required: true },
  archived: { type: Boolean, required: true },
});

chatSchema.plugin(uniqueValidator);

export default mongoose.model('Chat', chatSchema);
