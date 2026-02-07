"use client";
import React, { useEffect, useState } from "react";
import { Typography, Card, Button } from "@material-tailwind/react";
import { LogOut, LayoutDashboard, Users, Star } from "lucide-react";
import FeedbackChart from "@/components/feedbackChart";
import FeedbackCards from "@/components/feedbackCards";
import axios from "axios";

export default function AdminFeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({ avgRating: 0, totalFeedbacks: 0, productStats: {} });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      try {
        const query = `?sort=${sortBy}&order=desc${selectedProduct ? `&product=${selectedProduct}` : ""}`;
        const res = await axios.get(`/api/admin/feedbacks${query}`);
        setFeedbacks(res.data.feedbacks || []);
        setStats(res.data.stats || {});
      } catch (err) {
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeedbacks();
  }, [sortBy, selectedProduct]);

  const handleLogout = () => {
    // Add logout logic here
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-purple-50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-800 p-3 rounded-2xl text-white">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <Typography variant="h4" className="text-gray-900 font-bold">Admin Dashboard</Typography>
              <Typography className="text-gray-500 text-sm">Managing {stats.totalFeedbacks} User Feedbacks</Typography>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="text" 
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-6 py-3 rounded-2xl transition-all"
          >
            <LogOut size={18} /> Logout
          </Button>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Users className="text-purple-600"/>} label="Total Feedbacks" value={stats.totalFeedbacks} color="bg-purple-50" />
          <StatCard icon={<Star className="text-yellow-600"/>} label="Avg. Rating" value={`${stats.avgRating} / 5`} color="bg-yellow-50" />
          <Card className="p-6 rounded-[2rem] shadow-sm border border-purple-50 bg-white">
            <Typography className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Product Distribution</Typography>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.productStats || {}).map(([name, count]) => (
                <span key={name} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {name}: <span className="text-purple-700 font-bold">{count}</span>
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Analytics & Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Card */}
          <Card className="lg:col-span-2 p-8 rounded-[2rem] shadow-sm border border-purple-50 bg-white">
            <Typography variant="h6" className="text-gray-800 mb-6 font-bold flex items-center gap-2">
               Volume Analysis
            </Typography>
            <FeedbackChart productStats={stats.productStats} />
          </Card>

          {/* Controls Card */}
          <Card className="p-8 rounded-[2rem] shadow-sm border border-purple-50 bg-white flex flex-col justify-center space-y-6">
            <Typography variant="h6" className="text-gray-800 font-bold">Filters & Sort</Typography>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Sort Order</label>
                <select 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-200"
                >
                  <option value="createdAt">Newest First</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Filter Product</label>
                <select 
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-200"
                >
                  <option value="">All Products</option>
                  {Object.keys(stats.productStats || {}).map(prod => (
                    <option key={prod} value={prod}>{prod}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Feedback Cards Grid */}
        <div className="space-y-6">
          <Typography variant="h5" className="text-gray-800 font-bold px-2">Recent Submissions</Typography>
          {loading ? (
            <div className="h-40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((fb, i) => <FeedbackCards key={i} {...fb} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <Card className="p-6 rounded-[2rem] shadow-sm border border-purple-50 bg-white flex flex-row items-center gap-4">
      <div className={`${color} p-4 rounded-2xl`}>{icon}</div>
      <div>
        <Typography className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</Typography>
        <Typography variant="h4" className="text-gray-900 font-bold">{value}</Typography>
      </div>
    </Card>
  );
}