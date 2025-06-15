import feedbackModel from "@/models/feedbackModel";
import { connect } from "@/dbConfig/dgConfig";

export async function GET(request) {
    try {
        await connect();
        const feedbacks = await feedbackModel.find().sort({ createdAt: -1 }).lean();

        // Format the response
        const formattedFeedbacks = feedbacks.map(feedback => ({
            name: feedback.name,
            email: feedback.email,
            product: feedback.product,
            feedbackText: feedback.feedbackText,
            rating: feedback.rating,
            createdAt: feedback.createdAt,
        }));

        return Response.json(formattedFeedbacks, { status: 200 });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return Response.json({ error: "Failed to fetch feedbacks." }, { status: 500 });
    }
}