"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
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

  const productOptions = Object.keys(stats.productStats || {});

  // Menu for sorting options
  function SortByMenu() {
    const options = [
      { value: "createdAt", label: "Newest" },
      { value: "rating", label: "Rating" },
      { value: "popularity", label: "Popularity (Product)" },
    ];
    const currentLabel = options.find((opt) => opt.value === sortBy)?.label || "Sort by";
    return (
      <Menu animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
        <MenuHandler>
          <Button
            variant="outlined"
            color="blue-gray"
            className="min-w-[160px] flex justify-between items-center"
          >
            {currentLabel}
          </Button>
        </MenuHandler>
        <MenuList>
          {options.map((opt) => (
            <MenuItem
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={sortBy === opt.value ? "bg-blue-50 text-blue-700" : ""}
            >
              {opt.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  // Menu for filtering by product
  function ProductMenu() {
    return (
      <Menu animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
        <MenuHandler>
          <Button
            variant="outlined"
            color="blue-gray"
            className="min-w-[160px] flex justify-between items-center"
          >
            {selectedProduct
              ? selectedProduct
              : "All Products"}
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setSelectedProduct("")}>
            All Products
          </MenuItem>
          {productOptions.map((prod) => (
            <MenuItem
              key={prod}
              onClick={() => setSelectedProduct(prod)}
              className={selectedProduct === prod ? "bg-blue-50 text-blue-700" : ""}
            >
              {prod}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        {/* Title and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <Typography variant="h4" className="font-bold text-gray-800 text-center md:text-left">
            Admin: User Feedbacks
          </Typography>
        </div>

        {/* Stats Card */}
        <Card className="p-6 shadow-md rounded-xl flex flex-col sm:flex-row gap-6 justify-between items-center bg-gradient-to-r from-white via-gray-50 to-gray-100">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-700">{stats.totalFeedbacks}</span>
            <span className="text-gray-600 text-sm font-medium">Total Feedbacks</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center text-2xl font-bold text-yellow-500">
              <span className="mr-1">{stats.avgRating}</span>
              <svg className="h-6 w-6 inline-block text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.75l-6.172 3.247 1.18-6.885L2 9.753l6.914-1.004L12 2.25l3.086 6.499L22 9.753l-5.008 4.359 1.18 6.885z" />
              </svg>
              / 5
            </span>
            <span className="text-gray-600 text-sm font-medium">Average Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-gray-700">Popular Products</span>
            <ul className="mt-1 text-gray-500 text-sm font-normal">
              {productOptions.length === 0 ? (
                <li>No products yet</li>
              ) : (
                productOptions.map((prod) => (
                  <li key={prod}>
                    {prod}: <span className="font-semibold text-blue-800">{stats.productStats[prod]}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </Card>

        <Card className="p-6 shadow-md rounded-xl bg-white">
            <Typography variant="h6" className="mb-4 text-gray-800">
                Feedback Count by Product
            </Typography>
            <FeedbackChart productStats={stats.productStats} />
        </Card>

        {/* Controls Card */}
        <Card className="p-4 shadow flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-white rounded-xl">
          <div className="flex-1 flex flex-col md:flex-row gap-4 md:items-center">
            <span className="text-gray-700 font-medium">Sort by</span>
            <SortByMenu />
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 md:items-center">
            <span className="text-gray-700 font-medium">Filter by Product</span>
            <ProductMenu />
          </div>
        </Card>

        {/* Feedback List */}
        <Card className="p-6 bg-white shadow rounded-xl">
          {loading ? (
            <Typography className="text-center text-gray-500">Loading feedbacks...</Typography>
          ) : feedbacks.length === 0 ? (
            <Typography className="text-center text-gray-400">No feedbacks found.</Typography>
          ) : (
            <div className="space-y-6">
              {feedbacks.map((fb, i) => <FeedbackCards key={i} {...fb} />)}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}