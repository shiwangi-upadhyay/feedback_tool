import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
username: {
    type: String, 
    required: true,  
},
email: { 
    type: String, 
    required: true, 
    unique: true 
},
password: { 
    type: String, 
    required: true 
}, // Should be hashed
isAdmin: { 
    type: Boolean, 
    default: false 
},
  // Add other fields as needed
});


const User =  mongoose.models.User || mongoose.model("User", userSchema);
export default User;
