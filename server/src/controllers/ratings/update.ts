import { Request, Response } from 'express';
import { Rating } from '../../models/Rating';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const update = async (req: CustomRequest, res: Response) => {
    try {
        const { postId, rateCol } = req.body;
        const userId = req.user?.user_id;

        if (!userId) {
            return res.status(400).json({ msg: "User not authenticated" });
        }

        if (!postId || rateCol === undefined) {
            return res.status(400).json({ msg: "Insert the required input" });
        }

        if (rateCol < 1 || rateCol > 5) {
            return res.status(400).json({ msg: "Invalid rating value. It should be between 1 and 5." });
        }

        const rating = await Rating.findOne({
            where: {
                user_id: userId,
                post_id: postId 
            }
        });

        if (!rating) {
            return res.status(404).json({ msg: "Rating not found" });
        }

        rating.rateCol = rateCol;
        await rating.save();

        return res.status(200).json({ msg: "Rating updated successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
