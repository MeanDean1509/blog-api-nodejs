const mongoose = require('mongoose');
const Post = require('../Post/Post'); 

// create a user schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    profilePhoto: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    
    isBlocked: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    role : {
        type: String,
        enum: ['Admin', 'Guest', 'Editor'],
    },

    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    blocked:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // plan:
    //     {
    //         type: String,
    //         enum: ['Free', 'Premium', 'Pro'],
    //         default: 'Free'
    //     },

    userAwards: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold'],
        default: 'Bronze',
    },




},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
//Hooks
//pre-before record is saved // find/ findOne


userSchema.pre("findOne", async function(next) {
    //populate posts
    this.populate({
        path: 'posts',
    });
    const userId = this._conditions._id;
    const posts = await Post.find({ user: userId });
    const lastPost = posts[posts.length - 1];
    //get the last post date
    const lastPostDate = new Date(lastPost?.createdAt);
    const lastPostDateString = lastPostDate.toLocaleDateString();   
    userSchema.virtual('lastPostDate').get(function() {
        return lastPostDateString;
    });

    // check if user inactive for 30 days
    // get current date
    const currentDate = new Date();

    const diff = currentDate - lastPostDate;
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    
    
    if (diffInDays > 30) {
        userSchema.virtual('isInactive').get(function() {
            return true;
        });

        //find user 
        await User.findByIdAndUpdate(userId, { 
            isBlocked: true 
        }, { new: true }
        )

    }
    else {
        userSchema.virtual('isInactive').get(function() {
            return false;
        });
         //find user 
        await User.findByIdAndUpdate(userId, { 
            isBlocked: false
        }, { new: true }
        )
    }
   
    // last activity date
    const daysAgo = Math.floor(diffInDays);
    userSchema.virtual('lastActivity').get(function() {
        if (daysAgo <= 0) {
            return 'Today';
        }
        else if (daysAgo === 1) {
            return 'Yesterday';
        }
        else {
            return `${daysAgo} days ago`;
        }
    });

    // Upgrade user award
    const numberofPosts = posts.length;
    if (numberofPosts < 10) {
        await User.findByIdAndUpdate(userId, {
            userAwards: 'Bronze'
        }, { new: true });
    };
    if (numberofPosts >= 10 && numberofPosts < 20) {
        await User.findByIdAndUpdate(userId, {
            userAwards: 'Silver'
        }, { new: true });
    }
    if (numberofPosts >= 20) {
        await User.findByIdAndUpdate(userId, {
            userAwards: 'Gold'
        }, { new: true });
    }

    next();
})
//post -after saving
userSchema.post('save', function(next){
    console.log('Post save hook called');
});
//Get the full name of the user
userSchema.virtual('fullName').get(function(){
    return `${this.firstname} ${this.lastname}`;
});

//get user initials
userSchema.virtual('initials').get(function(){
    return `${this.firstname.charAt(0)}${this.lastname.charAt(0)}`;
});

//Get posts count
userSchema.virtual('postsCount').get(function() {
    return this.posts.length;
});

//Get followers count
userSchema.virtual('followersCount').get(function() {
    return this.followers.length;
});

//Get following count
userSchema.virtual('followingCount').get(function() {
    return this.following.length;
});

//Get viewers count
userSchema.virtual('viewersCount').get(function() {
    return this.viewers.length;
});

//Get blocked users count
userSchema.virtual('blockedCount').get(function() {
    return this.blocked.length;
});

//Compile the user model
const User = mongoose.model('User', userSchema);

//Export the user model
module.exports = User;