"use client";
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import axios from "axios"
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage({ isSignup }: {
    isSignup: boolean
}) {
    const apiUrl = process.env.API_ENDPOINT;
    const router = useRouter();

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignup() {
        setIsError(false);
        setIsLoading(true);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;

        if (isSignup) {
            try {
                const res = await axios.post(`http://localhost:3001/api/user/signup`, {
                    email: email,
                    password: password,
                    name: name
                });
                router.push("/signin");
            } catch (err: any) {
                const message = err.response?.data?.message || "Wrong input provided";
                setError(message);
                setIsError(true);
            }
        } else {
            try {
                const res = await axios.post(`http://localhost:3001/api/user/login`, {
                    email: email,
                    password: password,
                });
                // Store token and redirect to dashboard
                localStorage.setItem("token", res.data.token);
                router.push("/dashboard");
            } catch (err: any) {
                const message = err.response?.data?.message || "Wrong input provided";
                setError(message);
                setIsError(true);
            }
        }
        setIsLoading(false);
    }

    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Draftly</span>
                    </Link>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {isSignup ? "Create your account" : "Welcome back"}
                        </h1>
                        <p className="text-gray-500">
                            {isSignup
                                ? "Start collaborating with your team today"
                                : "Sign in to continue to your canvas"}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        {isSignup && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    ref={nameRef}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                ref={emailRef}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                ref={passwordRef}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Error Message */}
                        {isError && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSignup}
                            disabled={isLoading}
                            className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isSignup ? "Create Account" : "Sign In"}
                            {!isLoading && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">
                                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                                </span>
                            </div>
                        </div>

                        {/* Switch Auth Mode */}
                        <Link
                            href={isSignup ? "/signin" : "/signup"}
                            className="w-full py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center"
                        >
                            {isSignup ? "Sign In Instead" : "Create an Account"}
                        </Link>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        By continuing, you agree to our{" "}
                        <a href="#" className="text-gray-900 hover:underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="text-gray-900 hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </div>

            {/* Right Side - Decorative */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
                
                {/* Floating Shapes */}
                <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-200/40 blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-purple-200/40 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-green-200/40 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Content Card */}
                <div className="relative z-10 max-w-lg">
                    {/* Canvas Preview */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mb-8">
                        {/* Window Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex-1 text-center text-sm text-gray-400 font-medium">
                                team-brainstorm
                            </div>
                        </div>
                        {/* Canvas */}
                        <div className="relative h-56 bg-white p-6">
                            <div className="absolute top-6 left-6 w-28 h-16 rounded-lg border-2 border-blue-400 bg-blue-50/50"></div>
                            <div className="absolute top-10 left-40 w-20 h-20 rounded-full border-2 border-purple-400 bg-purple-50/50"></div>
                            <div className="absolute bottom-8 right-8 w-32 h-12 rounded-lg border-2 border-green-400 bg-green-50/50"></div>
                            <svg className="absolute top-16 left-28" width="80" height="40">
                                <path d="M0 20 Q40 0 80 20" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="4,4"/>
                            </svg>
                            {/* Cursor */}
                            <div className="absolute bottom-16 left-24 flex items-center gap-1">
                                <div className="w-3 h-3 border-l-2 border-t-2 border-indigo-500 -rotate-45"></div>
                                <span className="px-1.5 py-0.5 bg-indigo-500 text-white text-xs rounded">You</span>
                            </div>
                        </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-center">
                        <p className="text-2xl font-medium text-gray-800 mb-4">
                            "Ideas shouldn't wait for a refresh."
                        </p>
                        <p className="text-gray-500">
                            Join thousands of teams collaborating in real-time
                        </p>
                    </blockquote>

                    {/* Stats */}
                    <div className="flex justify-center gap-12 mt-8">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">10K+</p>
                            <p className="text-sm text-gray-500">Active Users</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">50K+</p>
                            <p className="text-sm text-gray-500">Canvases Created</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">99.9%</p>
                            <p className="text-sm text-gray-500">Uptime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
