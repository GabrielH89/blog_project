import { Request, Response } from 'express';
import { User } from '../../models/User';
import { CustomRequest } from '../../middleware/authAuthentication';

export const getUser = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.user_id;
        
        const user = await User.findOne({
            where: {user_id: userId}
        })        

        if(!user) {
            return res.status(404).json({msg: "User not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
}
