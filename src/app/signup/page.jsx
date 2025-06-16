"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardBody,
    Button,
    Input,
    Checkbox,
    Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

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
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md rounded-2xl shadow-lg p-0">
                <div className="bg-black rounded-t-2xl py-8 px-5 flex flex-col items-center shadow-md">
                    <Typography variant="h3" className="text-white font-bold">
                        Sign Up
                    </Typography>
                </div>
                <form onSubmit={handleSignup} className="w-full">
                <CardBody className="flex flex-col gap-5 px-7 py-7">
                    <Input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={e =>
                            setForm(f => ({ ...f, username: e.target.value }))
                        }
                        size="lg"
                        required
                        className="bg-white py-2 pl-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition "
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e =>
                            setForm(f => ({ ...f, email: e.target.value }))
                        }
                        size="lg"
                        required
                        className="bg-white py-2 pl-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition "
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={e =>
                            setForm(f => ({ ...f, password: e.target.value }))
                        }
                        size="lg"
                        required
                        className="bg-white py-2 pl-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition"               
                    />
                    <div className="flex items-center gap-2 mt-2">
                        <Checkbox
                            checked={form.isAdmin}
                            onChange={e =>
                            setForm(f => ({ ...f, isAdmin: e.target.checked }))
                            }
                            className="border-gray-400"
                        />
                        <span className="text-gray-600 font-medium">Register as Admin</span>
                    </div>
                    <Button
                        type="submit"
                        className="bg-black shadow-lg rounded-lg text-lg font-bold mt-3 p-2"
                        fullWidth
                        disabled={loading}
                        >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <Typography
                        variant="small"
                        className="mt-6 flex justify-center text-gray-600"
                        >
                        Already have an account?
                        <Link
                            href="/login"
                            className="ml-1 font-bold text-gray-800 underline hover:text-black"
                        >
                            Login
                        </Link>
                    </Typography>
                </CardBody>
            </form>
        </Card>
    </div>
  );
}