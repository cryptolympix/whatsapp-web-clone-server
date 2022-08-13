import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  content: {
    type: {
      text: { type: String, required: false },
      imageUrl: { type: String, required: false },
      audioUrl: { type: String, required: false },
    },
    required: true,
  },
  createdAt: { type: Date, required: true },
  type: { type: String, required: true, enum: ['TEXT', 'IMAGE', 'AUDIO'] },
  senderId: { type: String, required: true },
  read: { type: [String], required: true },
});

messageSchema.plugin(uniqueValidator);

export default mongoose.model('Message', messageSchema);
