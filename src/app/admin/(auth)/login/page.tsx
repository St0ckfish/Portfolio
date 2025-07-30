"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/store/api/authApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [signIn, { isLoading }] = useSignInMutation();
  const router = useRouter();
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await signIn({ username, password }).unwrap();
      router.push("/admin");
    } catch (err: any) {
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${booleanValue ? "bg-white" : "bg-gray-900"}`}>
      <div className={`max-w-md w-full space-y-8 p-8 ${booleanValue ? "bg-gray-50" : "bg-gray-800"} rounded-lg shadow-lg`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${booleanValue ? "text-gray-900" : "text-white"}`}>
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${booleanValue ? "text-gray-700" : "text-gray-300"}`}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${booleanValue ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-white"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${booleanValue ? "text-gray-700" : "text-gray-300"}`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${booleanValue ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-white"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <span className={`text-sm ${booleanValue ? "text-gray-600" : "text-gray-400"}`}>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/admin/signup")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}