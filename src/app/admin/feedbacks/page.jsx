"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";

export default function AdminFeedbacksPage() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeedbacks() {
        try {
            const res = await axios.get("/api/admin/feedbacks");
            setFeedbacks(res.data || []);
        } catch (err) {
            setFeedbacks([]);
        } finally {
            setLoading(false);
        }
        }
        fetchFeedbacks();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-[92vh]">
        <Card className="w-full max-w-2xl p-8">
            <Typography variant="h4" color="blue-gray" className="mb-6">
            All User Feedbacks
            </Typography>
            {loading ? (
            <Typography>Loading...</Typography>
            ) : feedbacks.length === 0 ? (
            <Typography>No feedback found.</Typography>
            ) : (
            <div className="space-y-4">
                {feedbacks.map((fb, idx) => (
                <div key={idx} className="border-b pb-2">
                    <Typography variant="h6">{fb.name}</Typography>
                    <Typography color="gray" className="text-sm">
                    Email: {fb.email}
                    </Typography>
                    <Typography className="mt-2">{fb.feedbackText}</Typography>
                    <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm">Rating:</span>
                    <span className="text-sm text-gray-800 font-semibold">
                        {fb.rating}/5
                    </span>
                    </div>
                    <Typography color="gray" className="text-xs mt-1">
                    {new Date(fb.createdAt).toLocaleString()}
                    </Typography>
                </div>
                ))}
            </div>
            )}
        </Card>
        </div>
    );
    
}
