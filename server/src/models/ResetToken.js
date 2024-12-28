const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true
   },
   token: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600 // Token expires in 1 hour
   }
}, {
   versionKey: false
});

module.exports = mongoose.model('ResetToken', resetTokenSchema);