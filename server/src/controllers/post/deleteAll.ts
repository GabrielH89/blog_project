import { Request, Response } from 'express';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const deleteAll = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.user_id;
        
        const postsToDelete = await Post.findAll({
            where: {user_id: userId}
        });

        if(postsToDelete.length === 0){
            return res.status(404).json({msg: "No posts found to delete"});
        }

        Post.destroy({
            where: {user_id: userId}
        });

        return res.status(200).json({msg: "Posts deleted with success"});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
}
