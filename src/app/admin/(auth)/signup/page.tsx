"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/store/api/authApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    image: null as File | null,
  });
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password || !formData.name || !formData.image) {
      setError("Please fill in all fields and select an image");
      return;
    }

    try {
      await signUp({
        username: formData.username,
        password: formData.password,
        name: formData.name,
        image: formData.image,
      }).unwrap();
      router.push("/admin");
    } catch (err: any) {
      setError(err?.data?.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${booleanValue ? "bg-white" : "bg-gray-900"}`}>
      <div className={`max-w-md w-full space-y-8 p-8 ${booleanValue ? "bg-gray-50" : "bg-gray-800"} rounded-lg shadow-lg`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${booleanValue ? "text-gray-900" : "text-white"}`}>
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${booleanValue ? "text-gray-700" : "text-gray-300"}`}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border ${booleanValue ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-white"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${booleanValue ? "text-gray-700" : "text-gray-300"}`}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border ${booleanValue ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-white"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label htmlFor="image" className={`block text-sm font-medium ${booleanValue ? "text-gray-700" : "text-gray-300"}`}>
                Profile Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className={`mt-1 block w-full px-3 py-2 border ${booleanValue ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-white"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {imagePreview && (
                <div className="mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                </div>
              )}
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
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <span className={`text-sm ${booleanValue ? "text-gray-600" : "text-gray-400"}`}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/admin/login")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}