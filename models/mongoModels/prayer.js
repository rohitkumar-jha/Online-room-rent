const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PrayerSchema = new Schema({
    prayerTitle: { type: String },
    prayerDesc: { type: String },
    userId: { type: String, required: true },
    isDeleted: { type: Boolean },
    isActive: { type: Boolean }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Prayer', PrayerSchema);