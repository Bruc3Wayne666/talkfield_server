const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        username: {
            type: mongoose.Schema.Types.String,
            required: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
            min: 8
        },
        profileImage: {
            type: mongoose.Schema.Types.String,
            default: ''
        },
        coverImage: {
            type: mongoose.Schema.Types.String,
            default: ''
        },
        followers: {
            type: mongoose.Schema.Types.Array,
            default: []
        },
        following: {
            type: mongoose.Schema.Types.Array,
            default: []
        },
        isAdmin: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        },
        desc: {
            type: mongoose.Schema.Types.String,
            default: ''
        },
        city: {
            type: mongoose.Schema.Types.String,
            max: 100
        },
        from: {
          type: mongoose.Schema.Types.String,
          max: 100
        },
        relationship: {
            type: mongoose.Schema.Types.Number,
            enum: [1, 2, 3]
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('User', UserSchema)