const mongoose = require('mongoose'); 

const tokenSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
  },
  token_type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
    expires_in: {
     type: Date, 
    expires: 3600,
  },
});

module.exports = mongoose.model("Token", tokenSchema); 