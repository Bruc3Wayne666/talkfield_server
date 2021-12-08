const Message = require('../models/Message')

class MessageController {
    async create(req, res) {
        const newMessage = new Message(req.body)

        try {
            const savedMessage = await newMessage.save()
            res.status(200).json(savedMessage)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getAll(req, res) {
        const {conversationId} = req.params

        try {
            const messages = await Message.find({
                conversationId: conversationId
            })
            res.status(200).json(messages)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = new MessageController()