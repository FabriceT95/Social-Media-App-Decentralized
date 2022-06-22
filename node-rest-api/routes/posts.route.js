const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        return res.status(500).json(error);
    }
})

// Update a post
router.put("/:id", async (req, res) => {


    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post has been updated");
        } else {
            return res.status(403).json("You cant update only your post");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});


// Delete a post
router.delete("/:id", async (req, res) => {


    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post has been deleted");
        } else {
            return res.status(403).json("You cant update only your post");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})


// Like / dislike a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("Post has been disliked");
        }
    } catch (error) {
        return res.status(500).json(error);
    }

})
// Get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
})
// Get timeline posts
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        return res.status(500).json(error);
    }
})


// Get user's all posts
router.get('/profile/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(error);
    }
})


module.exports = router;