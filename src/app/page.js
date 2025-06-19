"use client";
import Link from "next/link";
import { Button, Typography, Card } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  return (
     <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <Card className="p-10 flex flex-col items-center shadow-lg bg-white border-2 border-purple-100">
          <Typography variant="h2" className="font-bold text-purple-800 mb-2 text-center">
            Welcome to <span className="text-purple-600">Feedback Collector Application</span>
          </Typography>
          <Typography variant="p" className="text-gray-700 mb-8 text-center">
            Collect, review, and manage product feedback effortlessly. Empower your users and improve your products with real-time insights!
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-800 hover:bg-purple-900 font-semibold shadow">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outlined"
                className="border-purple-800 text-purple-800 hover:bg-purple-100 font-semibold"
              >
                Login
              </Button>
            </Link>
          </div>
          <Typography variant="small" className="text-gray-500 text-center">
            Are you an admin?{" "}
            <Link
              href="/admin/feedbacks"
              className="text-purple-800 underline hover:text-purple-900 font-semibold"
            >
              Go to Admin Dashboard
            </Link>
          </Typography>
        </Card>

        {/* Features */}
        <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center text-center bg-purple-100/60 border border-purple-100">
            <span className="text-3xl mb-2">📝</span>
            <Typography variant="h6" className="font-bold mb-1 text-purple-800">Easy Feedback</Typography>
            <Typography className="text-gray-600 text-sm">
              Submit feedback quickly with a beautiful, simple interface.
            </Typography>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center bg-purple-100/60 border border-purple-100">
            <span className="text-3xl mb-2">📊</span>
            <Typography variant="h6" className="font-bold mb-1 text-purple-800">Live Analytics</Typography>
            <Typography className="text-gray-600 text-sm">
              See insights and product stats update in real time.
            </Typography>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center bg-purple-100/60 border border-purple-100">
            <span className="text-3xl mb-2">🔒</span>
            <Typography variant="h6" className="font-bold mb-1 text-purple-800">Secure & Simple</Typography>
            <Typography className="text-gray-600 text-sm">
              Modern authentication and admin control for peace of mind.
            </Typography>
          </Card>
        </section>
      </div>
    </main>
  );
}
