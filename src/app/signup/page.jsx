"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/signup", form);
      if (res.data.success) {
        toast.success("Signup successful! Please login.");
        router.push("/login");
      } else {
        toast.error(res.data.error || "Signup failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[92vh]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h5" color="blue-gray">
          Sign Up
        </Typography>
        <form onSubmit={handleSignup} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              name="username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              size="lg"
              placeholder="Username"
              required
            />
            <Input
              name="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              size="lg"
              type="email"
              placeholder="Email"
              required
            />
            <Input
              name="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              size="lg"
              type="password"
              placeholder="Password"
              required
            />
            {/* Optional: Allow admin registration via checkbox */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isAdmin}
                onChange={e => setForm(f => ({ ...f, isAdmin: e.target.checked }))}
              />
              Register as Admin
            </label>
          </div>
          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account? <Link href="/login" className="font-medium text-gray-900">Login</Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}