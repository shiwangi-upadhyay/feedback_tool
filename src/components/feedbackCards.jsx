"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Star } from "lucide-react";

export default function FeedbackCards({ name, email, feedbackText, rating, createdAt }) {
  return (
    <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] overflow-hidden border border-purple-50 bg-white">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Typography className="font-bold text-gray-900 text-lg leading-tight">{name || "Anonymous User"}</Typography>
            <Typography className="text-purple-400 text-xs font-medium">{email}</Typography>
          </div>
          <div className="bg-yellow-50 px-3 py-1 rounded-xl flex items-center gap-1">
            <Star size={14} className="text-yellow-600 fill-yellow-600" />
            <span className="text-yellow-700 font-bold text-sm">{rating}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-2xl mb-4 min-h-[100px]">
          <Typography className="text-gray-600 text-sm italic leading-relaxed">
            "{feedbackText}"
          </Typography>
        </div>
        
        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Date Submitted</span>
          <span className="text-purple-300">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
}