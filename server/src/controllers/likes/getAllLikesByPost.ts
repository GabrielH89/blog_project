import { Request, Response } from 'express';
import { Like } from '../../models/Like';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { CustomRequest } from '../../middleware/authAuthentication';

export const getAllLikesByPost = async (req: CustomRequest, res: Response) => {
    try {
        const {postId} = req.params;
        
        if(!postId) {
            return res.status(404).json({msg: "Post id is required"});
        }

        const likes = await Like.findAll({
            where: {post_id: postId},
            include: [{model: User, attributes: ['user_id', 'name']}]
        });

        if(likes.length === 0) {
            return res.status(404).json({msg: "Likes not found for this post"});
        }

        return res.status(200).json({postId, likes});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error});
    }
};
