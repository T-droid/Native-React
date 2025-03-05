import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^([\w.-]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        trim: true,
        minLength: 8,
        maxLength: 200
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;