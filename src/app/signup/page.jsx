"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    return(
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
                {/* Left side img */}
                <section className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-0 py-8 md:py-0">
                    <div className="relative mb-5 w-full flex flex-col items-center">
                        <img
                            src="/feedback-login.png"
                            alt="Login Illustration"
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-fit"
                        />
                    </div>
                </section>

                {/* Right side form */}
                <section className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-0 py-8 md:py-0">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-purple-800 text-3xl md:text-4xl mb-3 text-center">Join Feedback Collector Tool</h1>
                        <p className="text-gray-700 mb-8 text-center text-base md:text-lg">
                            Become part of a community that values your input.
                            <br />
                            Sign up to start sharing your <span className="font-semibold">feedback </span> today.
                        </p>
                    </div>
                    <form onSubmit={handleSignup} className="w-full max-w-[500px] mx-auto">
                        <input
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={e =>
                                setForm(f => ({ ...f, username: e.target.value }))
                            }
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-2 focus:border-gray-500 transition text-base"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={e =>
                                setForm(f => ({ ...f, email: e.target.value }))
                            }
                            required
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-2 focus:border-gray-500 transition text-base"
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
                            className="w-full text-gray-700 px-5 py-3 rounded-full border border-gray-300 mb-2 focus:border-gray-500 transition text-base"
                        />
                        <div className="flex items-center gap-2 mt-2 mb-4">
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
                            className="w-full bg-[#e4c7f8] text-purple-800 rounded-full py-3 font-semibold text-lg mt-2 mb-6 transition hover:bg-purple-800 hover:text-purple-100"
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                        <div className="text-center text-gray-700 text-sm">
                            Already have an account?
                            <Link
                                href="/login"
                                className="ml-1 font-bold text-purple-800 underline hover:text-purple-600"
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