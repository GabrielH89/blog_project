import { Request, Response } from 'express';
import { Like } from '../../models/Like';
import { CustomRequest } from '../../middleware/authAuthentication';

export const remove = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const { postId } = req.body;
        const userId = req.user?.user_id;

        if (!postId) {
            return res.status(400).json({ msg: "Insert the required input" });
        }

        const likeToDelete = await Like.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        });

        if (!likeToDelete) {
            return res.status(404).json({ msg: "Like not found" });
        }

        await likeToDelete.destroy();
        return res.status(200).json({ msg: "Like removed successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Error: " + error });
    }
};
