"use client";
import { useState, useEffect } from "react";
import StarRating from "@/components/starRating";
import { LogOut, User, MessageSquare, Package, Loader2 } from "lucide-react";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "",
    feedbackText: "",
    rating: 0,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH REAL USER DATA
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();

        if (res.ok && data.user) {
          setForm((prev) => ({
            ...prev,
            name: data.user.name || "User",
            email: data.user.email,
          }));
        } else {
          // If not logged in, you might want to redirect to login page
          console.error("User not authenticated");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    // To logout, you'll need an API that clears the 'token' cookie
    await fetch("/api/users/logout", { method: "POST" });
    window.location.href = "/login";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.feedbackText || !form.rating) {
      setStatus("Please provide a rating and your feedback.");
      return;
    }
    const res = await fetch("/api/users/feedback", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("Thank you! Your feedback has been received.");
      setForm((prev) => ({ ...prev, feedbackText: "", rating: 0 }));
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-purple-800" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9fc] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl border border-purple-50 overflow-hidden">
        
        {/* Header with Logout */}
        <div className="bg-purple-800 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Feedback Portal</h1>
            <p className="text-purple-200 text-sm mt-1">Logged in as {form.name}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 px-5 py-2.5 rounded-2xl transition-all border border-white/20 text-sm font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* User Display (Non-editable) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Your Identity</p>
              <p className="text-gray-700 font-semibold flex items-center gap-2">
                <User size={16} className="text-purple-400" /> {form.name}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
              <p className="text-gray-600 text-sm">{form.email}</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-purple-50/50 rounded-3xl p-6 flex flex-col items-center border border-purple-100">
            <h3 className="text-purple-900 font-bold mb-4">Rate your Experience</h3>
            <StarRating
              value={form.rating}
              onChange={(rating) => setForm(f => ({ ...f, rating }))}
              size={40}
              interactive
            />
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            <div className="relative group">
               <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-purple-500 transition-colors" size={20} />
               <input
                  placeholder="Which product are you reviewing?"
                  value={form.product}
                  onChange={(e) => setForm(f => ({ ...f, product: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-400 transition-all outline-none shadow-sm"
               />
            </div>

            <div className="relative group">
              <MessageSquare className="absolute left-4 top-5 text-gray-700 group-focus-within:text-purple-500 transition-colors" size={20} />
              <textarea
                placeholder="Tell us more about your experience..."
                rows={4}
                required
                value={form.feedbackText}
                onChange={(e) => setForm(f => ({ ...f, feedbackText: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-400 transition-all outline-none resize-none shadow-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center">
            <button
              type="submit"
              className="w-[250px]  bg-purple-800 text-white font-bold py-4 rounded-[1.5rem] shadow-lg shadow-purple-200 hover:bg-purple-900 hover:shadow-xl hover:-translate-y-0.5 transform transition-all active:scale-95"
            >
              Submit Feedback
            </button>
            
            {status && (
              <p className={`mt-4 text-center text-sm font-bold ${status.includes("Thank") ? "text-green-600" : "text-red-500"}`}>
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}