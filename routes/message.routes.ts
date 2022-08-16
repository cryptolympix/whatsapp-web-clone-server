import express from 'express';
import auth from '../middlewares/auth';
import * as messageCtrl from '../controllers/message.controller';

const router = express.Router();

router.post('/create', auth, messageCtrl.createMessage);
router.delete('/delete/:id', auth, messageCtrl.deleteMessage);
router.delete('/deleteOnChat/:chatId', messageCtrl.deleteMessagesOnChat);
router.post('/update/:id', auth, messageCtrl.updateMessage);
router.get('/chat/:chatId', auth, messageCtrl.getMessagesOnChat);
router.get('/', auth, messageCtrl.getAllMessages);
router.get('/:id', auth, messageCtrl.getMessage);

export default router;
