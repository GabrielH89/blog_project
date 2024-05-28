import { Request, Response } from 'express';
import { Like } from '../../models/Like';
import { CustomRequest } from '../../middleware/authAuthentication';

export const count = async (req: CustomRequest, res: Response) => {
    try {
        const {postId} = req.params;
        
        if(!postId) {
            return res.status(404).json({msg: "Post id is required"});
        }

        const likeCount = await Like.count({where: {post_id: postId}});

        if(!likeCount) {
            return res.status(404).json({msg: "Likes not found for this post"});
        }

        return res.status(200).json({postId, likeCount});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error});
    }
};
