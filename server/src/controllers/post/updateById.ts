import { Request, Response } from 'express';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication';

export const updateById = async (req: CustomRequest, res: Response) => {
    try {
        const {title, body} = req.body;
        const currentDate = new Date();
        const userId = req.user?.user_id;
        const postId = req.params.id_post;

        
        if(!title || !body) {
            return res.status(400).json({msg: "Please, insert all required inputs"})
        }

        if(title === "" || body === ""){
            return res.status(400).json({msg: "Please, fill all required inputs"});
        }

        if(title.length > 55) {
            return res.status(400).json({msg: "Title input has more than 55 caracters"});
        }

        if(body.length > 400) {
            return res.status(400).json({msg: "Body input has more than 400 caracters"});
        }

        const postToUpdate = await Post.findOne({
            where: {
                post_id: postId,
                user_id: userId
            }
        });

        if(!postToUpdate) {
            return res.status(400).json({msg: "You cannot update this post"});
        }

        postToUpdate?.update({title, body, currentDate});

        return res.status(200).json({msg: "Post updated with success"});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
}
