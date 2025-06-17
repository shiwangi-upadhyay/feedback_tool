"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function FeedbackCards({ name, email, feedbackText, rating, createdAt }) {
  return (
    <Card className="w-full shadow-md rounded-lg">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name || "Anonymous"}
        </Typography>
        <Typography color="gray" className="text-sm mb-2">
          Email: {email || "Not provided"}
        </Typography>
        <Typography className="mb-4">{feedbackText}</Typography>
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-gray-600">Rating:</span>
          <span className="font-semibold text-gray-800">{rating}/5</span>
        </div>
        <Typography color="gray" className="text-xs">
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </CardBody>
    </Card>
  );
}
