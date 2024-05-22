import express from 'express';
import userController from '../controllers/userController';
import postController from '../controllers/postController';
import { authenticateToken } from '../middleware/authAuthentication';

const router = express.Router();

//Routes from users
router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);

//Routes from posts
router.post("/post", authenticateToken, postController.create);
router.get("/post", authenticateToken, postController.getAll);
router.get("/post/:id_post", authenticateToken, postController.getById);
router.delete("/post", authenticateToken, postController.deleteAll);
router.delete("/post/:id_post", authenticateToken, postController.deleteById);
router.put("/post/:id_post", authenticateToken, postController.updateById);

export default router;