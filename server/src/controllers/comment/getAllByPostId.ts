import { Request, Response } from 'express';
import { Comment } from '../../models/Comment';
import { User } from '../../models/User';
import { CustomRequest } from '../../middleware/authAuthentication';

// Função para buscar todos os comentários de um post com informações do usuário
export const getAllByPostId = async (req: Request, res: Response) => {
    try {
        const { id_post } = req.params;

        const comments = await Comment.findAll({
            where: { post_id: id_post },
            include: [{ model: User, attributes: ['name'] }],
            order: [['comment_id', 'DESC']]
        });

        if(comments.length === 0) {
            return res.status(404).json({ msg: "Comments not found for this post" });
        }

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
