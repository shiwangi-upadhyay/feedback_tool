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

export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false
    });
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
        const res = await axios.post("/api/users/login", {
            email: form.email,
            password: form.password,
        });
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
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md rounded-2xl shadow-xl p-0">
                <div className="bg-black rounded-t-2xl py-8 flex flex-col items-center shadow-md mb-6">
                    <Typography variant="h3" className="text-white font-bold">
                        Login
                    </Typography>
                </div>
                <form onSubmit={handleLogin} className="w-full">
                    <CardBody className="flex flex-col gap-6 px-7 pb-2">
                        <Input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={e =>
                                setForm(f => ({ ...f, email: e.target.value }))
                            }
                            size="lg"
                            placeholder="Email"
                            required
                            className="bg-white py-2 pl-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition"
                        />
                        <Input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={e =>
                                setForm(f => ({ ...f, password: e.target.value }))
                            }
                            size="lg"
                            placeholder="Password"
                            required
                            className="bg-white py-2 pl-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition "
                        
                        />
                    <div className="flex items-center gap-2 mt-1 mb-2">
                        <Checkbox
                            checked={form.remember}
                            onChange={e =>
                            setForm(f => ({ ...f, remember: e.target.checked }))
                            }
                            className="border-gray-400"
                        />
                        <span className="text-gray-600 font-medium">Remember Me</span>
                    </div>
                    <Button
                        type="submit"
                        className="bg-black shadow-lg rounded-lg text-lg font-bold mt-2 p-2"
                        fullWidth
                        disabled={loading}
                        >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    <Typography
                        variant="small"
                        className="mt-7 flex justify-center text-gray-600"
                        >
                        Don&apos;t have an account?
                        <Link
                            href="/signup"
                            className="ml-1 font-bold text-gray-800 underline hover:text-black"
                        >
                            Sign up
                        </Link>
                    </Typography>
                </CardBody>
            </form>
        </Card>
    </div>
);
}