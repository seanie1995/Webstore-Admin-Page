"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import React from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCred.user.getIdToken();

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        throw new Error("Login Failed");
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Your Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
