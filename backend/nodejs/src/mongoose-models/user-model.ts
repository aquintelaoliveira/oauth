import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: {
        type: Number,
        required: false 
    },
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: false 
    },    
    password: {
        type: String,
        required: false
    },
}, { timestamps: true });

export const User = mongoose.model('users', schema);

