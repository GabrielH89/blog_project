import { Request, Response } from 'express';
import { Comment } from '../../models/Comment';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const create = async (req: CustomRequest, res: Response) => {
    try {
        const { commentCol, post_id } = req.body;
        const userId = req.user?.user_id;  

        if (!commentCol || !post_id) {
            return res.status(400).json({ msg: "Please, insert all required inputs" });
        }

        if (commentCol === "") {
            return res.status(400).json({ msg: "Please, fill the required input" });
        }

        if (commentCol.length > 400) {
            return res.status(400).json({ msg: "Comment input has more than 400 characters" });
        }

        // Verifica se o post existe
        const post = await Post.findByPk(post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        const newComment = await Comment.create({
            commentCol,
            user_id: userId,
            post_id: post_id
        });

        return res.status(201).json({ msg: "Comment created successfully", comment: newComment });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error});
    }
};
