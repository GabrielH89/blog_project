import { Request, Response } from 'express';
import { Comment } from '../../models/Comment';
import { CustomRequest } from '../../middleware/authAuthentication';

export const deleteById = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.user_id;
        const commentId = req.params.id_comment;

        const commentToDelete = await Comment.findOne({
            where: {
                comment_id: commentId,
                user_id: userId
            }
        });

        if (!commentToDelete) {
            return res.status(404).json({ msg: "Comment not found or you don't have permission to delete it" });
        }

        Comment.destroy({
            where: {
                comment_id: commentId,
                user_id: userId             
            }
        })

        return res.status(200).json({ msg: "Comment deleted successfully"});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
