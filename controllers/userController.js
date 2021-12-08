const bcrypt = require('bcrypt')
const User = require('../models/User')

class UserController {
    async update(req, res) {
        const {userId} = req.body
        const {id} = req.params

        if (userId === id) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password, salt)
                } catch (err) {
                    return res.status(500).json(err)
                }
            }
            try {
                const user = await User.findByIdAndUpdate(id, {
                    $set: req.body
                })

                res.status(200).json(user)
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json("You can update only your account!")
        }
    }

    async delete(req, res) {
        const {userId, isAdmin} = req.body
        const {id} = req.params

        if (userId === id || isAdmin) {
            try {
                await User.findByIdAndDelete(id)

                res.status(200).json('Account has been deleted')
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json("You can update only your account!")
        }
    }

    async getOne(req, res) {
        const {id} = req.params

        try {
            const user = await User.findById(id)
            const {password, email, updatedAt, ...other} = user._doc

            res.status(200).json(other)
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    async getFriends(req, res) {
        const {id} = req.params

        try {
            const user = await User.findById(id)
            const friends = await Promise.all(
                user.following.map(friendId => {
                    return User.findById(friendId)
                })
            )
            let friendList = []
            friends.map(friend => {
                const {_id, username, profileImage} = friend
                friendList.push({
                    _id, username, profileImage
                })
            })

            res.status(200).json(friendList)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async follow(req, res) {
        const {userId} = req.body
        const {id} = req.params

        try {
            if (userId !== id) {
                const user = await User.findById(id)
                const follower = await User.findById(userId)
                if (!user.followers.includes(userId)) {
                    await user.updateOne({$push: {followers: userId}})
                    await follower.updateOne({$push: {following: id}})

                    res.status(200).json('User has been followed')
                } else {
                    res.status(403).json('You already follow this user')
                }
            } else {
                res.status(403).json('You can\'t follow yourself')
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    async unfollow(req, res) {
        const {userId} = req.body
        const {id} = req.params

        try {
            if (userId !== id) {
                const user = await User.findById(id)
                const follower = await User.findById(userId)
                if (user.followers.includes(userId)) {
                    await user.updateOne({$pull: {followers: userId}})
                    await follower.updateOne({$pull: {following: id}})

                    res.status(200).json('User has been unfollowed')
                } else {
                    res.status(403).json('You already unfollow this user')
                }
            } else {
                res.status(403).json('You can\'t unfollow yourself')
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = new UserController()