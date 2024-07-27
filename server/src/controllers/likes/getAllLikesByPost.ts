// src/controllers/likeController.ts
import { Request, Response } from 'express';
import { Like } from '../../models/Like';
import { User } from '../../models/User';
import { CustomRequest } from '../../middleware/authAuthentication';

export const getAllLikesByPost = async (req: CustomRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.user_id; // Obter o user_id do usuário autenticado
        
        if (!postId) {
            return res.status(404).json({ msg: "Post ID is required" });
        }

        const likes = await Like.findAll({
            where: { post_id: postId },
            include: [{ model: User, attributes: ['user_id', 'name'] }]
        });

        // Verificar se o usuário específico curtiu o post
        const userLiked = likes.some(like => like.user_id === userId);

        return res.status(200).json({ postId, likes, userLiked });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
