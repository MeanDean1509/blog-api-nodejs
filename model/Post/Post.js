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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required'],
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
// Hook
postSchema.pre(/^find/, function (next) {
    postSchema.virtual('viewsCount').get(function () {
        const post = this;
        return post.numViews.length;
    });

    postSchema.virtual('likesCount').get(function () {
        const post = this;
        return post.likes.length;
    }
    );
    postSchema.virtual('dislikesCount').get(function () {
        const post = this;
        return post.dislikes.length;
    });

    postSchema.virtual('likesPercentage').get(function () {
        const post = this;
        const total = post.likes.length + post.dislikes.length;
        const percentage = total ? (post.likes.length / total) * 100 : 0;
        return `${percentage.toFixed(2)}%`; // Return percentage with two decimal places
    });

    postSchema.virtual('dislikesPercentage').get(function () {
        const post = this;
        const total = post.likes.length + post.dislikes.length;
        const percentage = total ? (post.dislikes.length / total) * 100 : 0;
        return `${percentage.toFixed(2)}%`; // Return percentage with two decimal places
    }
    );

    postSchema.virtual('daysAgo').get(function () {
        const post = this;
        const date =  new Date(post.createdAt);
        const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (daysAgo === 0) {
            return 'Today';
        } else if (daysAgo === 1) {
            return 'Yesterday';
        } else {
            return `${daysAgo} days ago`;
        }
    
    }
    );
    next();
});
// create a post model
const Post = mongoose.model('Post', postSchema);
// export the post model
module.exports = Post;