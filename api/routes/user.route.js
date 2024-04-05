import express from 'express';
import {test,updateUser, getMyStores} from '../controllers/user.controller.js'
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();
router.get('/test',test);
router.get('/my-stores', verifyToken, getMyStores)
router.post('/update/:id', verifyToken, updateUser);
export default router;