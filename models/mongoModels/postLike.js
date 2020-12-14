const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostLikeSchema = new Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    isPostLiked: { type: Boolean },
    isPostDisLiked: { type: Boolean },
    isDeleted: { type: Boolean },
    isActive: { type: Boolean }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('PostLike', PostLikeSchema);