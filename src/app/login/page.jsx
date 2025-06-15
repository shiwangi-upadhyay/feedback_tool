"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
// import Cookies from "js-cookie"; // Uncomment if you want to store token yourself

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", form);
      if (res.data.success) {
        toast.success("Login successful!");

        if (res.data.user.isAdmin) {
          router.push("/admin/feedbacks/");
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.data.error || "Login failed.");
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
          Log In
        </Typography>
        <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              name="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              size="lg"
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
          </div>
          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account? <Link href="/signup" className="font-medium text-gray-900">Sign Up</Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}