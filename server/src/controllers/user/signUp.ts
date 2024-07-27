import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from 'bcrypt';

const isValidEmail = (email: string) => {
    const regexEmail =  /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
}

const isValidPassword = (password: string) => {
    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    return regexPassword.test(password);
}

export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Please, insert all required inputs' });
        }

        if (name === "" || email === "" || password === "") {
            return res.status(400).json({ msg: "Please, fill all required input" });
        }

        if (name.length > 100) {
            return res.status(400).json({ msg: "Name cannot exceed 100 characters" });
        }

        if (email.length > 200) {
            return res.status(400).json({ msg: "Email cannot exceed 200 characters" });
        }

        if (password.length > 20) {
            return res.status(400).json({ msg: "Password cannot exceed 20 characters" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const isEmailExists = await User.findOne({ where: { email } });

        if (isEmailExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ msg: "User created with success" });
    } catch (error) {
        return res.status(500).json({ msg: "Error: " + error });
    }
};
