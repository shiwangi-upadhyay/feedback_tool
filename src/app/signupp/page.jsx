"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {

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
    return(
        <div className="min-h-screen bg-[#f6f6f6] flex justify-center items-center">
            <div className="w-full flex">
                {/*left side img*/}
                <section className="flex flex-col items-center justify-center w-1/2">
                    <div className="relative mb-5 w-full flex flex-col items-center">
                        <img
                            src="/feedback-login.png"
                            alt="Login Illustration"
                            className="w-[500px] h-[600px] object-cover rounded-xl shadow"
                        />
                    </div>
                </section>

                {/*right side form */}
                <section className="w-1/2 flex flex-col justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-black text-4xl mb-3">Welcome back!</h1>
                        <p className="text-gray-700 mb-8">
                            Simplify your workflow and boost your productivity
                            <br />
                            with <span className="font-semibold">Tuga&apos;s App</span>. Get started for free.
                        </p>
                    </div>
                    <form onSubmit={handleSignup} className="w-[500px] mx-auto">
                        <input
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={e =>
                                setForm(f => ({ ...f, username: e.target.value }))
                            }
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-1 focus:border-gray-500 transition"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={e =>
                                setForm(f => ({ ...f, email: e.target.value }))
                            }
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-1 focus:border-gray-500 transition"
                        />
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={form.password}
                            onChange={e =>
                                setForm(f => ({ ...f, password: e.target.value }))
                            }
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-1 focus:border-gray-500 transition"
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                checked={form.isAdmin}
                                onChange={e =>
                                    setForm(f => ({ ...f, isAdmin: e.target.checked }))
                                }
                                className="border-gray-400"
                                id="register-admin"
                            />
                            <label htmlFor="register-admin" className="text-gray-600 font-medium">
                                Register as Admin
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white rounded-full py-3 font-semibold text-lg mt-6 mb-6 transition hover:bg-[#222]"
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                        <div className="text-center text-gray-700 text-sm">
                            Already have an account?
                            <Link
                                href="/login"
                                className="ml-1 font-bold text-gray-800 underline hover:text-black"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}