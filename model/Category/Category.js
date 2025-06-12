const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
}, {
    timestamps: true
});
// Create a category model
const Category = mongoose.model('Category', categorySchema);
// Export the category model
module.exports = Category;
