import express from 'express';
import {test,updateUser, getMyStores, saveStore} from '../controllers/user.controller.js'
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();
router.get('/test',test);
router.get('/my-stores', verifyToken, getMyStores)
router.post('/update/:id', verifyToken, updateUser);
router.post('/save-store', verifyToken, saveStore)
export default router;