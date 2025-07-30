"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Calendar, Clock, Tag, Eye } from "lucide-react";
import { useGetAllBlogsQuery } from "@/store/api/authApi";
import { RootState } from "@/GlobalRedux/store";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  views?: number;
}

const BlogPage = () => {
  const { data: blogs, isLoading, error, refetch } = useGetAllBlogsQuery();
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const baseImageUrl = "https://portfolio-backend-rxwc.onrender.com";

  if (isLoading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${booleanValue ? "bg-white" : "bg-[#0c0c0d]"}`}>
        {/* Hero Section */}
        <div className="relative pt-32 pb-16 px-4">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#b292ff] to-[#7feaff] rounded-full opacity-10 blur-3xl animate-[blob_7s_infinite]"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-[#7feaff] to-[#b292ff] rounded-full opacity-10 blur-3xl animate-[blob_8s_infinite]"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-[#613cb8] to-[#b292ff] rounded-full opacity-10 blur-3xl animate-[blob_9s_infinite]"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${booleanValue ? "text-black" : "text-white"}`}>
              Blog
            </h1>
            <p className={`text-xl md:text-2xl ${booleanValue ? "text-gray-600" : "text-gray-300"}`}>
              Thoughts, stories and ideas
            </p>
          </div>
        </div>

        {/* Blog Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Create 6 skeleton cards */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden ${
                  booleanValue 
                    ? "bg-gray-50 shadow-lg border border-gray-200" 
                    : "bg-[#1a1a1a] shadow-xl border border-gray-800"
                }`}
              >
                {/* Image skeleton */}
                <div className={`relative h-48 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} animate-pulse`}>
                  {/* Category badge skeleton */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-16 h-6 rounded-full ${booleanValue ? "bg-gray-300" : "bg-gray-600"} animate-pulse`}></div>
                  </div>
                </div>

                {/* Content skeleton */}
                <div className="p-6">
                  {/* Title skeleton */}
                  <div className={`h-6 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded mb-3 animate-pulse`}></div>
                  <div className={`h-6 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-3/4 mb-3 animate-pulse`}></div>
                  
                  {/* Content skeleton */}
                  <div className="mb-4 space-y-2">
                    <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                    <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-5/6 animate-pulse`}></div>
                    <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-4/5 animate-pulse`}></div>
                  </div>

                  {/* Tags skeleton */}
                  <div className="flex gap-2 mb-4">
                    <div className={`h-5 w-12 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
                    <div className={`h-5 w-16 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
                    <div className={`h-5 w-14 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
                  </div>

                  {/* Meta info skeleton */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className={`h-4 w-20 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                      <div className={`h-4 w-16 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                    </div>
                    <div className={`h-4 w-12 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${booleanValue ? "bg-white" : "bg-[#0c0c0d]"}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${booleanValue ? "text-red-600" : "text-red-400"}`}>
            Error Loading Blogs
          </h2>
          <button 
            onClick={refetch}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              booleanValue 
                ? "bg-[#613cb8] text-white hover:bg-[#7c4dff]" 
                : "bg-[#b292ff] text-black hover:bg-[#7feaff]"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`min-h-screen transition-colors duration-300 ${booleanValue ? "bg-white" : "bg-[#0c0c0d]"}`}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Scroll to top button */}
      {showButton && (
        <motion.button
          onClick={handleClick}
          className={`fixed top-6 right-6 p-3 rounded-full z-50 transition-all duration-300 ${
            booleanValue ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-4">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#b292ff] to-[#7feaff] rounded-full opacity-10 blur-3xl animate-[blob_7s_infinite]"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-[#7feaff] to-[#b292ff] rounded-full opacity-10 blur-3xl animate-[blob_8s_infinite]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-[#613cb8] to-[#b292ff] rounded-full opacity-10 blur-3xl animate-[blob_9s_infinite]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            className={`text-5xl md:text-7xl font-bold mb-6 ${booleanValue ? "text-black" : "text-white"}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Blog
          </motion.h1>
          <motion.p 
            className={`text-xl md:text-2xl ${booleanValue ? "text-gray-600" : "text-gray-300"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Thoughts, stories and ideas
          </motion.p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {blogs && blogs.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {blogs.map((blog: Blog, index: number) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link href={`/blog/${blog._id}`}>
                  <div className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
                    booleanValue 
                      ? "bg-gray-50 hover:bg-white shadow-lg hover:shadow-2xl border border-gray-200" 
                      : "bg-[#1a1a1a] hover:bg-[#202020] shadow-xl hover:shadow-2xl border border-gray-800"
                  }`}>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.imageUrl.startsWith('http') ? blog.imageUrl : `${baseImageUrl}${blog.imageUrl}`}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#b292ff] text-black px-3 py-1 rounded-full text-sm font-medium">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 ${
                        booleanValue 
                          ? "text-black group-hover:text-[#613cb8]" 
                          : "text-white group-hover:text-[#b292ff]"
                      }`}>
                        {blog.title}
                      </h3>
                      
                      <p className={`mb-4 line-clamp-3 ${booleanValue ? "text-gray-600" : "text-gray-300"}`}>
                        {truncateContent(blog.content.replace(/<[^>]*>/g, ''))}
                      </p>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className={`text-xs px-2 py-1 rounded-full ${
                                booleanValue 
                                  ? "bg-gray-200 text-gray-700" 
                                  : "bg-gray-700 text-gray-300"
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              booleanValue ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-gray-300"
                            }`}>
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Meta info */}
                      <div className={`flex items-center justify-between text-sm ${
                        booleanValue ? "text-gray-500" : "text-gray-400"
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{getReadingTime(blog.content)}</span>
                          </div>
                        </div>
                        
                        {blog.views !== 0 && (
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            <span>{blog.views}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={`text-2xl font-bold mb-4 ${booleanValue ? "text-gray-600" : "text-gray-400"}`}>
              No blogs found
            </h3>
            <p className={`${booleanValue ? "text-gray-500" : "text-gray-500"}`}>
              Check back later for new content!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPage;
