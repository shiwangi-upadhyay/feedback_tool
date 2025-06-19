"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function FeedbackCards({ name, email, feedbackText, rating, createdAt }) {
  return (
    <Card className="w-full rounded-3xl overflow-hidden shadow-xl bg-white border-t-8 border-purple-100">
      <CardBody className="p-6 pb-4">
        <Typography variant="h5" className="font-bold text-xl text-gray-800 mb-1">
          {name || "Anonymous"}
        </Typography>
        <Typography className="text-gray-500 text-lg mb-4">
          Email: {email || "Not provided"}
        </Typography>
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">Rating:</span>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">{rating}/5</span>
        </div>
        <Typography className="mb-4">{feedbackText}</Typography>
      </CardBody>
        <Typography color="gray" className="bg-purple-100 text-purple-600 text-sm text-center py-3 tracking-wide font-medium rounded-b-3xl">
            {new Date(createdAt).toLocaleString()}
        </Typography>
    </Card>
  );
}
