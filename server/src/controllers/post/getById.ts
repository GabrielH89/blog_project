import { Request, Response } from 'express';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const getById = async (req: CustomRequest, res: Response) => {
    try {
        const postId = req.params.id_post;

        const post = await Post.findOne({
            where: {post_id: postId}
        });

        if(!post) {
            return res.status(404).json({msg: "Post not found"});
        }

        return res.status(200).json({ msg: post });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
}
