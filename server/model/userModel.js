const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provied your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        require: [true, 'Please provied your email'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please provied your password'],
        min: [8, 'Your password length must be 8']
    },
    avatar: {
        publicId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    roal: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = model('User', userSchema)
module.exports = User