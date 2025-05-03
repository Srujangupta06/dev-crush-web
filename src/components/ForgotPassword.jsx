import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Forgot Password
        </h2>
        <form >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter your email address
          </label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword
