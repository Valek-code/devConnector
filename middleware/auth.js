import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config({path:'../config/.env'})



export default function(req, res, next) {
    
    // Get token from header
    const token = req.header('x-auth-token');

    // If no token send error
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization failed!'})
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:'Token is not valid!'});
    }
}