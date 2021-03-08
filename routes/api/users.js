import express from 'express';
import {check, validationResult} from 'express-validator'
import User from '../../models/User.js'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path:'../../config/.env'})

const userRouter = express.Router();


// @route   POST api/users
// @desc    Register new users
// @access  Public

userRouter.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],
async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name,email,password} = req.body

    
    
    
    // return jwt ( for front-end login )
    try {
        // validations - User exists => error

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({ errors: [{msg:'Email already in use.'}] })
        }

        // Get gravatar if exists, if no set default gravatar ( 'mm' )
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User ({
            name,
            email,
            avatar,
            password
        })

        // Encrypt password ( bcryptjs ) / Save hashed to DB

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
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



export default userRouter;