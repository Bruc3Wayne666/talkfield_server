const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.String,
        },
        conversationId: {
            type: mongoose.Schema.Types.String,
        },
        body: {
            type: mongoose.Schema.Types.String
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Message', MessageSchema)