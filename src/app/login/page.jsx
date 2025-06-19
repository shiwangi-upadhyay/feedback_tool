"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import Image from "next/image"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

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
            const res = await axios.post("/api/users/login", {
                email: form.email,
                password: form.password,
            });
            if (res.data.success) {
                toast.success("Login successful!");
                if (res.data.user.isAdmin) {
                    router.push("/admin/feedbacks/");
                } else {
                    router.push("/feedbackForm");
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
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center">
                {/* Left: Login Form */}
                <section className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-0 py-8 md:py-0">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-purple-800 text-3xl md:text-4xl mb-3 text-center">Welcome back!</h1>
                        <p className="text-gray-700 mb-8 text-center text-base md:text-lg">
                            Your feedback makes a difference.
                            <br />
                            Log in and let your voice be heard
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="w-full max-w-[500px] mx-auto">
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={e =>
                                setForm(f => ({ ...f, email: e.target.value }))
                            }
                            placeholder="Email"
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-4 focus:border-gray-500 transition text-base"
                        />
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={e =>
                                setForm(f => ({ ...f, password: e.target.value }))
                            }
                            placeholder="Password"
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-1 focus:border-gray-500 transition text-base"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#e4c7f8] text-purple-800 rounded-full py-3 font-semibold text-lg mt-6 mb-6 transition hover:bg-purple-800 hover:text-purple-100"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <div className="text-center text-gray-700 text-sm">
                            Don&apos;t have an account?
                            <Link
                                href="/signup"
                                className="ml-1 font-bold text-purple-800 underline hover:text-purple-600"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </section>

                {/* Right: Illustration */}
                <section className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-0 py-8 md:py-0">
                    <div className="relative mb-5 w-full flex flex-col items-center">
                        {/* Responsive Image */}
                        <img
                            src="/feedback-login.png"
                            alt="Login Illustration"
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-fit"
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}