const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        desc: {
            type: mongoose.Schema.Types.String,
            max: 500
        },
        img: {
            type: mongoose.Schema.Types.String
        },
        likes: {
            type: mongoose.Schema.Types.Array,
            default: []
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Post', PostSchema)