import { Request, Response } from 'express';
import { Rating } from '../../models/Rating';
import { CustomRequest } from '../../middleware/authAuthentication';

export const remove = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const { postId } = req.params;  // Usar params em vez de body
        const userId = req.user?.user_id;

        if (!postId) {
            return res.status(400).json({ msg: "Post ID is required" });
        }

        const ratingToDelete = await Rating.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        });

        if (!ratingToDelete) {
            return res.status(404).json({ msg: "Rating not found" });
        }

        await ratingToDelete.destroy();
        return res.status(200).json({ msg: "Rating removed successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Error: " + error });
    }
};
