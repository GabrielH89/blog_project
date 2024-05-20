import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
    user?: {
        user_id: number;
    };
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Não autorizado

    jwt.verify(token, process.env.JWT_KEY || 'default_secret', (err, decoded) => {
        if (err) return res.sendStatus(403); // Proibido

        if (decoded && typeof decoded !== 'string') {
            req.user = { user_id: (decoded as { id: number }).id }; // Adiciona a informação do usuário à requisição
        }

        next();
    });
};
