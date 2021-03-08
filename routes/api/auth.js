import express from 'express';
import auth from '../../middleware/auth.js'
import User from '../../models/User.js';
import {check, validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config({path:'../../config/.env'})

const authRouter = express.Router();


// @route   GET api/auth
// @desc    Get authenticated user
// @access  Protected

authRouter.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/auth
// @desc    Auth user / get token
// @access  Public

authRouter.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email,password} = req.body

    
    try {
        // validations - User !exists => error

        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({ errors: [{msg:"Invalid credentials."}] })
        }

        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ errors: [{msg:"Invalid credentials."}] })
        }

        const payload = {
            user : {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600000, // change after production
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})



export default authRouter;