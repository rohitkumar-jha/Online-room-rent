const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PrayerStatusSchema = new Schema({
    prayerId: { type: String, required: true },
    userId: { type: String, required: true },
    isProgress: { type: Number },
    isDeleted: { type: Boolean },
    isActive: { type: Boolean }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('PrayerStatus', PrayerStatusSchema);