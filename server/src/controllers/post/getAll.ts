import { Request, Response } from 'express';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const getAll = async (req: CustomRequest, res: Response) => {
    try {
        const posts = await Post.findAll();

        if (posts.length === 0) {
            return res.status(404).json({ msg: "No posts found" });
        }

        return res.status(200).json({ msg: posts });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
