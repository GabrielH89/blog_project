import express from 'express';
import userController from '../controllers/userController';
import postController from '../controllers/postController';
import { authenticateToken } from '../middleware/authAuthentication';

const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.post("/post", authenticateToken, postController.create);
 
export default router;