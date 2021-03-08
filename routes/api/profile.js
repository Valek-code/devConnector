import express, { Router } from 'express';
import auth from '../../middleware/auth.js'
import Profile from '../../models/Profile.js'
import User from '../../models/User.js'
import Post from '../../models/Post.js'
import {check, validationResult} from 'express-validator'
import dotenv from 'dotenv'
import request from 'request'

dotenv.config({path:'../../config/.env'})

const profileRouter = express.Router();


// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private

profileRouter.get('/me', auth, async (req,res) => {

    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({msg:'No profile for this user.'})
        }
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')   
    }
})


// @route   POST api/profile
// @desc    Create/update user profile
// @access  Private

profileRouter.post('/', [auth,[
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        instagram,
        twitter,
        linkedin
    } = req.body;

    // Build profile obj

    const profileFields = {};

    profileFields.user = req.user.id
    
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername


    if(skills){
        profileFields.skills = skills.toString().split(',').map(skill => skill.trim())
    }

    // build social obj
    profileFields.social = {}

    if(youtube) profileFields.social.youtube = youtube
    if(facebook) profileFields.social.facebook = facebook
    if(instagram) profileFields.social.instagram = instagram
    if(twitter) profileFields.social.twitter = twitter
    if(linkedin) profileFields.social.linkedin = linkedin

    try {
        let profile = await Profile.findOne({user: req.user.id})

        if(profile){
            // update existing profile
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id}, 
                {$set:profileFields}, 
                {new: true})
            return res.json(profile)
        }

        profile = new Profile(profileFields);

        await profile.save()

        res.json(profile)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

profileRouter.get('/', async (req, res) => {
    try {
        
        const profiles = await Profile.find().populate('user', ['name','avatar'])

        res.json(profiles)

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public

profileRouter.get('/user/:user_id', async (req, res) => {
    try {
        
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name','avatar'])

        if(!profile){
            return res.status(400).json({ msg:'Profile not found.' })
        }


        res.json(profile)



    } catch (error) {
        console.log(error.message);

        if(error.kind == 'ObjectId'){
            return res.status(400).json({ msg:'Profile not found.' })
        }

        res.status(500).send('Server Error');
    }
})


// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private

profileRouter.delete('/', auth,async (req, res) => {
    try {

        // remove user posts
        await Post.deleteMany({user: req.user.id})

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id })

        // Remove user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({msg: 'Account deleted'})

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private

profileRouter.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
]], async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newXP = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id})

        profile.experience.unshift(newXP);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }

})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private

profileRouter.delete('/experience/:exp_id', auth, async (req,res) => {

    try {
        
        const profile = await Profile.findOne({user: req.user.id})

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }

})



// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private

profileRouter.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
]], async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const newEDU = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id})

        profile.education.unshift(newEDU);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }

})

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete profile education
// @access  Private

profileRouter.delete('/education/:edu_id', auth, async (req,res) => {

    try {
        
        const profile = await Profile.findOne({user: req.user.id})

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }

})

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public

profileRouter.get('/github/:username', async (req,res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }

        request(options,(err, response, body) => {
            if(err){
                console.log(err)
            }

            if(response.statusCode !== 200){
                return res.status(404).json({msg: 'No GitHub profile found.'})
            }

            res.send(JSON.parse(body))
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})



export default profileRouter;