
import feedbackModel from "@/models/feedbackModel";
import { connect } from "@/dbConfig/dgConfig";

export async function GET(request) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;
    const filterBy = searchParams.get("product") || null;

    
    let feedbacksQuery = feedbackModel.find();

    if (filterBy) {
      feedbacksQuery = feedbacksQuery.where("product").equals(filterBy);
    }

    // Sorting logic
    const sortOptions =
      sort === "rating"
        ? { rating: order }
        : sort === "popularity"
        ? { product: order }
        : { createdAt: -1 };

    const feedbacks = await feedbacksQuery.sort(sortOptions).lean();

    const totalFeedbacks = feedbacks.length;
    const avgRating =
      feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / totalFeedbacks || 0;

    const productStats = {};
    feedbacks.forEach((fb) => {
      const prod = fb.product || "Unknown";
      productStats[prod] = (productStats[prod] || 0) + 1;
    });

    return Response.json(
      {
        feedbacks,
        stats: {
          totalFeedbacks,
          avgRating: avgRating.toFixed(2),
          productStats,
        },
      },
      { status: 200 }
    );
  } catch (error) {
      console.error("Error fetching feedbacks:", error);
    return Response.json(
      { 
        error: "Failed to fetch feedbacks." 
      },
      { 
        status: 500 
      }
    );
  }
}
