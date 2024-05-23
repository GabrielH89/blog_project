import { Request, Response } from 'express';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const deleteById = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.user_id;
        const postId = req.params.id_post;

        const postToDelete = await Post.findOne({
            where: {
                post_id: postId,
                user_id: userId
            }
        });

        if(!postToDelete) {
            return res.status(404).json({msg: "Post not found or you have no permission to delete it"});
        }

        Post.destroy({
            where: {
                post_id: postId,
                user_id: userId
            }
        });

        return res.status(200).json({msg: "Post deleted with success"});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
}
