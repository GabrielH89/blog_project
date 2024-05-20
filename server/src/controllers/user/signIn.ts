import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_KEY || 'default_secret', {
            expiresIn: '1h', // O token expira em 1 hora
        });

        return res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
