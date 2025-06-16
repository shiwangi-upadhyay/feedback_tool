import  mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email:{
        type:String,
        
    },
    
    feedbackText: {
        type: String,
        required: true
    },
    product: { 
        type: String, 
        default: "" 
    },          
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const feedbackModel = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default feedbackModel;