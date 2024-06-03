import { Request, Response } from 'express';
import { Rating } from '../../models/Rating';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { CustomRequest } from '../../middleware/authAuthentication';

export const getAllRatingByPost = async (req: CustomRequest, res: Response) => {
    try {
        const {postId} = req.params;
        
        if(!postId) {
            return res.status(404).json({msg: "Post id is required"});
        }

        const ratings = await Rating.findAll({
            where: {post_id: postId},
            include: [{model: User, attributes: ['user_id', 'name']}]
        });

        if(ratings.length === 0) {
            return res.status(404).json({msg: "Ratings not found for this post"});
        }

        return res.status(200).json({postId, ratings});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error});
    }
};
