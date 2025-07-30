"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "@/store/api/authApi";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";

const BlogEditPage = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params.blogID as string;
  
  const { data: blog, isLoading: blogLoading, error } = useGetBlogByIdQuery(blogId);
  const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // Initialize form with blog data
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setCategory(blog.category);
      setTags(blog.tags || []);
      // Ensure the image URL has the full backend URL
      const fullImageUrl = blog.imageUrl.startsWith('http') 
        ? blog.imageUrl 
        : `https://portfolio-backend-rxwc.onrender.com${blog.imageUrl}`;
      setCurrentImageUrl(fullImageUrl);
    }
  }, [blog]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle tag addition
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !category.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      
      // Only append image if a new one is selected
      if (image) {
        formData.append("image", image);
      }
      
      // Add tags as separate form fields
      tags.forEach(tag => {
        formData.append("tags", tag);
      });

      await updateBlog({ id: blogId, formData }).unwrap();
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  if (blogLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog</h1>
          <p className="text-gray-600 mb-4">Could not load the blog post for editing.</p>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">The blog post you&apos;re trying to edit doesn&apos;t exist.</p>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
              <p className="text-gray-600 mt-1">Update your blog post content</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={updateLoading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateLoading ? (
              <Spinner />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              required
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700">
                Content *
              </label>
            </div>
            <div className="p-4">
              <TextEditor
                value={content}
                onChange={handleContentChange}
                placeholder="Start writing your blog content..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Featured Image
            </label>
            {imagePreview ? (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="New preview"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : currentImageUrl ? (
              <div className="relative">
                <Image
                  src={currentImageUrl}
                  alt="Current image"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                  <div className="text-white text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Click to change image</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Category */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Technology, Lifestyle, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Blog Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Blog Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Author:</span>
                <div className="flex items-center space-x-2">
                  <Image
                    src={blog.authorId.imageUrl.startsWith('http') 
                      ? blog.authorId.imageUrl 
                      : `https://portfolio-backend-rxwc.onrender.com${blog.authorId.imageUrl}`}
                    alt={blog.authorId.name}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                  <span>{blog.authorId.name}</span>
                </div>
              </div>
              <div>
                <span className="font-medium">Created:</span> {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Updated:</span> {new Date(blog.updatedAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Views:</span> {blog.views}
              </div>
              <div>
                <span className="font-medium">Likes:</span> {blog.likes}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditPage;