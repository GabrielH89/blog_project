import { Request, Response } from 'express';
import { Like } from '../../models/Like';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const create = async (req: CustomRequest, res: Response) => {
    try {
        const {postId} = req.body;
        const userId = req.user?.user_id;  

        const postToFind = await Post.findByPk(postId);

        if(!postId) {
            return res.status(400).json({msg: "Insert the required input"});
        }

        if(!postToFind) {
            return res.status(404).json({msg: "Post not founnd"});
        }

        const existingLike = await Like.findOne({
            where: {
                user_id: userId,
                post_id: postId 
            }
        });

        if(existingLike) {
            return res.status(400).json({msg: "Your like already exists in this post"});
        }

        await Like.create({ user_id: userId, post_id: postId });
        return res.status(201).json({msg: "Liked with success"});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error});
    }
};
