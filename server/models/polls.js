import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
})

const pollSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    options: [optionSchema],
    //it will keep track of user who have voted
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Poll', pollSchema);