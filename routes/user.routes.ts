import express from 'express';
import auth from '../middlewares/auth';
import multer from '../middlewares/multer';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getUser);
router.post('/login', userCtrl.loginUser);
router.post('/logout/:id', auth, userCtrl.logoutUser);
router.post('/update/:id', auth, multer, userCtrl.updateUser);

export default router;
