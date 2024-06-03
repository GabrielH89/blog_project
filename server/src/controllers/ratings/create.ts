import { Request, Response } from 'express';
import { Rating } from '../../models/Rating';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const create = async (req: CustomRequest, res: Response) => {
    try {
        const {postId, rateCol} = req.body;
        const userId = req.user?.user_id;  

        const postToFind = await Post.findByPk(postId);

        if(!postId || !rateCol) {
            return res.status(400).json({msg: "Insert the required input"});
        }

        if(!postToFind) {
            return res.status(404).json({msg: "Post not founnd"});
        }

        if(rateCol === undefined || postId === "") {
            return res.status(400).json({msg: "Please, fill all required inputs"})
        } 

        if(rateCol < 1 || rateCol > 5) {
            return res.status(400).json({msg: "Invalid rating value. It should be between 1 and 5."})
        }

        const existingRating = await Rating.findOne({
            where: {
                user_id: userId,
                post_id: postId 
            }
        });

        if(existingRating) {
            return res.status(400).json({msg: "Your rating already exists in this post"});
        }
                
        await Rating.create({user_id: userId, post_id: postId, rateCol: rateCol});
        return res.status(201).json({msg: "Rating created successfully"});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error});
    }
};
