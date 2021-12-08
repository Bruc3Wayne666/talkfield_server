const Conversation = require('../models/Conversation')

class ConversationController {
    async create(req, res) {
        const {senderId, receiverId} = req.body
        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })

        try {
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getAll(req, res) {
        const {userId} = req.params

        try {
            const conversations = await Conversation.find({
                members: {
                    $in: userId
                }
            })
            res.status(200).json(conversations)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getOne(req, res) {
        const {firstId, secondId} = req.params

        try {
            const conversation = await Conversation.findOne({
                members: {
                    $all: [firstId, secondId]
                }
            })
            res.status(200).json(conversation)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = new ConversationController()