import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true 
    },
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Model = mongoose.model('sessions', schema);

export default Model;