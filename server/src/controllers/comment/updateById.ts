import { Request, Response } from 'express';
import { Comment } from '../../models/Comment';
import { CustomRequest } from '../../middleware/authAuthentication';

export const updateById = async (req: CustomRequest, res: Response) => {
    try {
        const { commentCol } = req.body;
        const userId = req.user?.user_id;
        const commentId = req.params.id_comment;

        if (!commentCol) {
            return res.status(400).json({ msg: "Please provide the commentCol field" });
        }

        const commentToUpdate = await Comment.findOne({
            where: {
                comment_id: commentId,
                user_id: userId
            }
        });

        if (!commentToUpdate) {
            return res.status(404).json({ msg: "Comment not found or you don't have permission to update it" });
        }

        await commentToUpdate.update({ commentCol });

        return res.status(200).json({ msg: "Comment updated successfully", comment: commentToUpdate });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
