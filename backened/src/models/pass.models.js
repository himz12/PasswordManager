import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  website: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  password: {
    type: String, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
}, { timestamps: true });

const Password = mongoose.model('Password', passwordSchema);
export default Password;