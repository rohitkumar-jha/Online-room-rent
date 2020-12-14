const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoomSchema = new Schema({
    roomName: { type: String },
    roomType: { type: String },
    userId: { type: String, required: true },
    actualCost: { type: Number, required: true },
    rent: { type: Number, required: true },
    imgId: { type: String },
    builtIn: { type: Date, required: true },
    occupiedBy: { type: String },
    occupiedOn: { type: Date},
    isAvailable: { type: Boolean },
    isDeleted: { type: Boolean },
    isActive: { type: Boolean }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Room', RoomSchema);