import { Request, Response } from 'express';
import { Post } from '../../models/Post';
import { CustomRequest } from '../../middleware/authAuthentication'

export const create = async (req: CustomRequest, res: Response) => {
    try {
        const { title, body } = req.body;
        const userId = req.user?.user_id; // Obtém o ID do usuário autenticado do token JWT
        const currentDate = new Date();

        if(!title || !body) {
            return res.status(400).json({msg: "Please, insert all required inputs"})
        }

        if(title === "" || body === ""){
            return res.status(400).json({msg: "Please, fill all required inputs"});
        }

        if(title.length > 55) {
            return res.status(400).json({msg: "Title input has more than 55 caracters"});
        }

        if(body.length > 6000) {
            return res.status(400).json({msg: "Body input has more than 400 caracters"});
        }

        const newPost = await Post.create({
            title,
            body,
            user_id: userId,
            created_at: currentDate,
            updated_at: currentDate,
        });


        return res.status(201).json({ msg: "Post created successfully", post: newPost });
    
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
