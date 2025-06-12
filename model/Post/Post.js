const mongoose = require('mongoose');

//create a post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    numViews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required']
    }
}, {
    timestamps: true
});

// create a post model
const Post = mongoose.model('Post', postSchema);
// export the post model
module.exports = Post;