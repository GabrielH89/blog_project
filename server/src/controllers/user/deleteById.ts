import { Request, Response } from 'express';
import { User } from '../../models/User';
import { CustomRequest } from '../../middleware/authAuthentication';

export const deleteById = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.user_id;
        
        const userToDelete = await User.findOne({
            where: {
                user_id: userId 
            }
        });

        if(!userToDelete) {
            return res.status(404).json({msg: "User not found"});
        }

        User.destroy({where: {user_id: userId}});

        return res.status(200).json({msg: "User deleted with success"});
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
}
