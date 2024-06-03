import { Request, Response } from 'express';
import { Rating } from '../../models/Rating';
import { CustomRequest } from '../../middleware/authAuthentication';
import sequelize from 'sequelize';

export const average = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const { postId } = req.params;  // Usar params em vez de body
        const userId = req.user?.user_id;

        if (!postId) {
            return res.status(400).json({ msg: "Post ID is required" });
        }

        const ratings = await Rating.findAll({
            where: {
                post_id: postId
            },
            attributes: [
                [sequelize.fn('SUM', sequelize.col('rateCol')), 'sumRating'],
                [sequelize.fn('AVG', sequelize.col('rateCol')), 'avgRating']
            ]
        });


        if (ratings.length === 0) {
            return res.status(404).json({ msg: "Ratings not found" });
        }

        return res.status(200).json({ msg: ratings[0]});
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Error: " + error });
    }
};
