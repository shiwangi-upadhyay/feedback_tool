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
    return(
        <div className="min-h-screen bg-white flex justify-center items-center  ">
            <div className="w-full flex ">
                {/*left side form*/}
                <section className="w-1/2 flex flex-col justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-purple-800 text-4xl mb-3">Welcome back!</h1>
                        <p className="text-gray-700 mb-8">
                            Simplify your workflow and boost your productivity
                            <br />
                            with <span className="font-semibold">Tuga&apos;s App</span>. Get started for free.
                        </p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="w-[500px] mx-auto">
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={e =>
                                setForm(f => ({ ...f, email: e.target.value }))
                            }
                            size="lg"
                            placeholder="Email"
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-4 focus:border-gray-500 transition"
                        />
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={e =>
                                setForm(f => ({ ...f, password: e.target.value }))
                            }
                            size="lg"
                            placeholder="Password"
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-1 focus:border-gray-500 transition"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#e4c7f8] text-purple-800 rounded-full py-3 font-semibold text-lg mt-6 mb-6 transition  hover:bg-purple-800 hover:text-purple-100"
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

                {/*right side image */}
                <section className="flex flex-col items-center justify-center w-1/2">
                    <div className="relative mb-5 w-full flex flex-col items-center">
                        {/* Picture */}
                        <img
                        src="/feedback-login.png"
                        alt="Login Illustration"
                        className="w-[600px] h-[600px] object-fit"
                        />
                    </div>
                    
                </section>
            </div>
        </div>
    )
}