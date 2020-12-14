const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: { type: String, required: true, max: 50, min: 2 },
    lastName: { type: String, required: true, max: 50, min: 2 },
    gender: { type: String, required: true, max: 50 },
    email: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 5000, min: 8 },
    DOB: { type: Date, required: true },
    isActive: { type: Boolean }
}, {
    timestamps: true
});

UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

// Export the model
module.exports = mongoose.model('User', UserSchema);