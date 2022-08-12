import express from 'express';
import auth from '../middlewares/auth';
import * as messageCtrl from '../controllers/message.controller';

const router = express.Router();

router.post('/insert', auth, messageCtrl.insertMessage);
router.delete('/delete/:id', auth, messageCtrl.deleteMessage);
router.delete('/deleteForChat/:chatId', messageCtrl.deleteMessagesForChat);
router.post('/update/:id', auth, messageCtrl.updateMessage);
router.get('/chat/:chatId', auth, messageCtrl.getMessagesForChat);
router.get('/', auth, messageCtrl.getAllMessages);

export default router;
