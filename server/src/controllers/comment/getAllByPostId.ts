import { Request, Response } from 'express';
import { Comment } from '../../models/Comment';
import { User } from '../../models/User';
import { CustomRequest } from '../../middleware/authAuthentication';

// Função para buscar todos os comentários de um post com informações do usuário
export const getAllByPostId = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id_post; 

        const comments = await Comment.findAll({
            where: { post_id: postId },
            include: [{ model: User, attributes: ['name'] }]
        });

        if(comments.length === 0) {
            return res.status(404).json({ msg: "Comments not found for this post" });
        }

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
