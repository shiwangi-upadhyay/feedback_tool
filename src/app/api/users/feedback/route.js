import { connect } from "@/dbConfig/dgConfig";
import feedbackModel from "@/models/feedbackModel";

export async function POST(request) {
    try {
        await connect();
        const data = await request.json();
        
        if (!data.feedbackText || !data.rating) {
            return new Response(JSON.stringify({ error: "Feedback and rating are required." }), { status: 400 });
        }

        const feedback = new feedbackModel({
            name: data.name || "",
            email: data.email || "",
            product: data.product || "",
            feedbackText: data.feedbackText,
            rating: data.rating,
        });
        await feedback.save();
    
        return new Response(
            JSON.stringify({ 
                message: "Feedback submitted successfully!" 
            }), 
            { 
                status: 201 
            });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        return new Response(
            JSON.stringify({ 
                error: "Failed to submit feedback." 
            }), 
            { 
                status: 500 
            });
    }
}