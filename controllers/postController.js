const Post = require('../models/Post')
const User = require('../models/User')

class PostController {
    async getAllNews(req, res) {
        const {userId} = req.params
        try {
            const currentUser = await User.findById(userId)
            const userPosts = await Post.find({userId: currentUser._id})
            const friendPosts = (await Promise.all(
                currentUser.following.map(friendId => {
                    Post.find({userId: friendId})
                })
            )).filter(post => post !== null)

            res.status(200).json(userPosts.concat(...friendPosts))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getAllPosts(req, res) {
        const {userId} = req.params
        try {
            const userPosts = await Post.find({userId: userId})
            res.status(200).json(userPosts)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        try {
            const post = await Post.findById(id)

            res.status(200).json(post)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async add(req, res) {
        try {
            const post = await new Post(req.body).save()

            res.status(200).json(post)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async update(req, res) {
        const {id} = req.params
        const {userId} = req.body
        try {
            const post = await Post.findById(id)
            if (post.userId === userId) {
                await post.updateOne({$set: req.body})

                res.status(200).json(post)
            } else {
                res.status(403).json("You can update only your post!")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async like(req, res) {
        const {id} = req.params
        const {userId} = req.body
        try {
            const post = await Post.findById(id)
            if (!post.likes.includes(userId)) {
                await post.updateOne({$push: {likes: userId}})

                res.status(200).json('You liked this post')
            } else {
                await post.updateOne({$pull: {likes: userId}})

                res.status(200).json('You disliked this post')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async delete(req, res) {
        const {id} = req.params
        const {userId} = req.body
        try {
            const post = await Post.findById(id)
            if (post.userId === userId) {
                await post.deleteOne()

                res.status(200).json(post)
            } else {
                res.status(403).json("You can delete only your post!")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = new PostController()