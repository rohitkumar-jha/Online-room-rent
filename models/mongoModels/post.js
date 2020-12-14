const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    postDesc: { type: String },
    userId: { type: String, required: true },
    imgId: { type: String },
    videoId: { type: String },
    isDeleted: { type: Boolean },
    isActive: { type: Boolean }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Post', PostSchema);