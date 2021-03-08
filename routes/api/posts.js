import express from 'express';
import {check, validationResult} from 'express-validator'
import User from '../../models/User.js'
import Post from '../../models/Post.js'
import Profile from '../../models/Profile.js'
import gravatar from 'gravatar'
import auth from '../../middleware/auth.js'
import dotenv from 'dotenv'

dotenv.config({path:'../../config/.env'})
const postsRouter = express.Router();


// @route   POST api/posts
// @desc    Create new post
// @access  Public

postsRouter.post('/', [auth, [
    check('text', 'Post cannot be empty').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }



    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()

        res.json(post)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }

    

})


// @route   GET api/posts
// @desc    Get all posts
// @access  Private

postsRouter.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private

postsRouter.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({msg:'Post not found.'})
        }

        res.json(post)
    } catch (error) {
        console.log(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Post not found.'})
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private

postsRouter.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({msg:'Post not found.'})
        }

        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg:"You don't have permission to do that."})
        }

        await post.remove();

        res.json({msg:'Post deleted.'})
    } catch (error) {
        console.log(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Post not found.'})
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private

postsRouter.put('/like/:id', auth, async(req,res) => {
    try {
        
        const post = await Post.findById(req.params.id);

        // Check if post is already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already liked.'});
        }

        post.likes.unshift({user: req.user.id })
        
        await post.save()

        res.json(post.likes)

    } catch (error) {
        console.log(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Post not found.'})
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private

postsRouter.put('/unlike/:id', auth, async(req,res) => {
    try {
        
        const post = await Post.findById(req.params.id);

        // Check if post is already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: 'Post not liked yet.'});
        }

        // remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        
        await post.save()

        res.json(post.likes)

    } catch (error) {
        console.log(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'Post not found.'})
        }
        res.status(500).send('Server Error')
    }
})

// @route   POST api/posts/comment/:id
// @desc    Create a comment on a post
// @access  Private

postsRouter.post('/comment/:id', [auth, [
    check('text', 'Post cannot be empty').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }



    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);

        await post.save()

        res.json(post.comments)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment on a specific post
// @access  Private

postsRouter.delete('/comment/:id/:comment_id', auth, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        if(!comment){
            return res.status(404).json({msg:'Comment not found.'})
        }
        
        if(req.user.id !== comment.user.toString()){
            return res.status(401).json({msg:"You don't have permission to do that."})
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex, 1)

        await post.save()

        res.json(post.comments)

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

export default postsRouter;