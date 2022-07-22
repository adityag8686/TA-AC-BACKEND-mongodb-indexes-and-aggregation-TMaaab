var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: String,
    email: { type: String, required: /@/ },
    address: {
    city: String,
    state: String,
    country: String,
    pin: Number,
    },
});

userSchema.index({ username: 1, email: 1 });
userSchema.index(
    { 'address.state': 1, 'address.country': 1 },
    { unique: true }
);

var addressSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
});

articleSchema.index({ tags: 1 });
addressSchema.index({ title: 'text' });
addressSchema.index({ description: 'text' });

module.exports = mongoose.model('User', userSchema);

module.exports = mongoose.model('address', addressSchema);