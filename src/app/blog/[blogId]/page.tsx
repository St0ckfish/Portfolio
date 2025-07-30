"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft, Calendar, Clock, Tag, Eye, Share2, Heart } from "lucide-react";
import { useGetBlogByIdQuery } from "@/store/api/authApi";
import { RootState } from "@/GlobalRedux/store";

const BlogDetailPage = () => {
  const params = useParams();
  const blogId = params.blogId as string;
  
  const { data: blog, isLoading, error } = useGetBlogByIdQuery(blogId);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const baseImageUrl = "https://portfolio-backend-rxwc.onrender.com";

  // Generate meta tags for the blog
  const generateMetaTags = () => {
    if (!blog) return null;

    const title = `${blog.title} | Mostapha Taha Blog`;
    const description = blog.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
    const imageUrl = blog.imageUrl.startsWith('http') ? blog.imageUrl : `${baseImageUrl}${blog.imageUrl}`;
    const url = typeof window !== 'undefined' ? window.location.href : '';

    return (
      <Head>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={blog.tags ? blog.tags.join(', ') : ''} />
        <meta name="author" content="Mostapha Taha" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Mostapha Taha Portfolio" />
        <meta property="article:author" content="Mostapha Taha" />
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:section" content={blog.category} />
        {blog.tags && blog.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@St0ckfish" />
        <meta name="twitter:creator" content="@St0ckfish" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blog.title,
              "description": description,
              "image": imageUrl,
              "author": {
                "@type": "Person",
                "name": "Mostapha Taha",
                "url": "https://mostaphataha.me"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Mostapha Taha Portfolio",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://mostaphataha.me/images/logo.png"
                }
              },
              "datePublished": blog.createdAt,
              "dateModified": blog.updatedAt || blog.createdAt,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": url
              },
              "articleSection": blog.category,
              "keywords": blog.tags ? blog.tags.join(', ') : '',
              "wordCount": blog.content.split(' ').length,
              "timeRequired": `PT${Math.ceil(blog.content.split(' ').length / 200)}M`
            })
          }}
        />
      </Head>
    );
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${booleanValue ? "bg-white" : "bg-[#0c0c0d]"}`}>
        {/* Back button skeleton */}
        <div className="fixed top-6 left-6 z-50">
          <div className={`w-20 h-10 rounded-full ${booleanValue ? "bg-gray-200" : "bg-gray-700"} animate-pulse`}></div>
        </div>

        {/* Hero image skeleton */}
        <div className={`relative h-[60vh] ${booleanValue ? "bg-gray-200" : "bg-gray-700"} animate-pulse`}>
          <div className="absolute top-32 left-8">
            <div className={`w-20 h-8 rounded-full ${booleanValue ? "bg-gray-300" : "bg-gray-600"} animate-pulse`}></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="relative -mt-32 z-10">
          <div className="max-w-4xl mx-auto px-6">
            {/* Article header skeleton */}
            <div className={`rounded-2xl p-8 mb-8 ${
              booleanValue 
                ? "bg-white shadow-2xl border border-gray-200" 
                : "bg-[#1a1a1a] shadow-2xl border border-gray-800"
            }`}>
              {/* Title skeleton */}
              <div className={`h-12 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-lg mb-6 animate-pulse`}></div>
              
              {/* Meta info skeleton */}
              <div className="flex gap-6 mb-6">
                <div className={`h-4 w-24 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                <div className={`h-4 w-20 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                <div className={`h-4 w-16 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
              </div>

              {/* Tags skeleton */}
              <div className="flex gap-2 mb-6">
                <div className={`h-6 w-16 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
                <div className={`h-6 w-20 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
                <div className={`h-6 w-18 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
              </div>

              {/* Action buttons skeleton */}
              <div className="flex gap-4">
                <div className={`h-10 w-20 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
                <div className={`h-10 w-20 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
              </div>
            </div>

            {/* Article content skeleton */}
            <div className={`rounded-2xl p-8 mb-8 ${
              booleanValue 
                ? "bg-white shadow-2xl border border-gray-200" 
                : "bg-[#1a1a1a] shadow-2xl border border-gray-800"
            }`}>
              <div className="space-y-4">
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-5/6 animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-4/5 animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-3/4 animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-5/6 animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-2/3 animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-4/5 animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded animate-pulse`}></div>
                <div className={`h-4 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded w-3/5 animate-pulse`}></div>
              </div>
            </div>

            {/* Navigation skeleton */}
            <div className="pb-20">
              <div className={`h-12 w-40 ${booleanValue ? "bg-gray-200" : "bg-gray-700"} rounded-full animate-pulse`}></div>
            </div>
          </div>
        </div>

        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#b292ff] to-[#7feaff] rounded-full opacity-5 blur-3xl animate-[blob_7s_infinite]"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-[#7feaff] to-[#b292ff] rounded-full opacity-5 blur-3xl animate-[blob_8s_infinite]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-[#613cb8] to-[#b292ff] rounded-full opacity-5 blur-3xl animate-[blob_9s_infinite]"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${booleanValue ? "bg-white" : "bg-[#0c0c0d]"}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${booleanValue ? "text-red-600" : "text-red-400"}`}>
            Blog not found
          </h2>
          <Link 
            href="/blog"
            className={`px-6 py-3 rounded-lg transition-all duration-300 inline-block ${
              booleanValue 
                ? "bg-[#613cb8] text-white hover:bg-[#7c4dff]" 
                : "bg-[#b292ff] text-black hover:bg-[#7feaff]"
            }`}
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Dynamic Meta Tags */}
      {generateMetaTags()}
      
      <motion.div 
        className={`min-h-screen transition-colors duration-300 ${booleanValue ? "bg-white" : "bg-[#0c0c0d]"}`}
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={blog.imageUrl.startsWith('http') ? blog.imageUrl : `${baseImageUrl}${blog.imageUrl}`}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Category badge */}
        <div className="absolute top-32 left-8">
          <span className="bg-[#b292ff] text-black px-4 py-2 rounded-full text-sm font-medium">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article header */}
          <motion.div 
            className={`rounded-2xl p-8 mb-8 ${
              booleanValue 
                ? "bg-white shadow-2xl border border-gray-200" 
                : "bg-[#1a1a1a] shadow-2xl border border-gray-800"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${booleanValue ? "text-black" : "text-white"}`}>
              {blog.title}
            </h1>

            {/* Meta info */}
            <div className={`flex flex-wrap items-center gap-6 mb-6 text-sm ${
              booleanValue ? "text-gray-600" : "text-gray-400"
            }`}>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{getReadingTime(blog.content)}</span>
              </div>
              {blog.views && (
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>{blog.views} views</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`text-sm px-3 py-1 rounded-full ${
                      booleanValue 
                        ? "bg-gray-100 text-gray-700" 
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : booleanValue
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={16} fill={isLiked ? "white" : "none"} />
                Like
              </motion.button>

              <motion.button
                onClick={handleShare}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  booleanValue 
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={16} />
                Share
              </motion.button>
            </div>
          </motion.div>

          {/* Article content */}
          <motion.div 
            className={`rounded-2xl p-8 mb-8 ${
              booleanValue 
                ? "bg-white shadow-2xl border border-gray-200" 
                : "bg-[#1a1a1a] shadow-2xl border border-gray-800"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div 
              className={`max-w-none ${booleanValue ? "text-gray-800" : "text-gray-200"}`}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
              }}
            >
              <style jsx>{`
                div :global(h1), div :global(h2), div :global(h3), div :global(h4), div :global(h5), div :global(h6) {
                  color: ${booleanValue ? '#1f2937' : '#ffffff'};
                  font-weight: 700;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                div :global(h1) { font-size: 2.25rem; }
                div :global(h2) { font-size: 1.875rem; }
                div :global(h3) { font-size: 1.5rem; }
                div :global(p) {
                  color: ${booleanValue ? '#4b5563' : '#d1d5db'};
                  margin-bottom: 1rem;
                }
                div :global(strong) {
                  color: ${booleanValue ? '#1f2937' : '#ffffff'};
                  font-weight: 600;
                }
                div :global(a) {
                  color: #b292ff;
                  text-decoration: underline;
                }
                div :global(a:hover) {
                  color: #7feaff;
                }
                div :global(code) {
                  background-color: ${booleanValue ? '#f3f4f6' : '#374151'};
                  color: ${booleanValue ? '#1f2937' : '#000'};
                  padding: 0.125rem 0.375rem;
                  border-radius: 0.25rem;
                  font-size: 0.875rem;
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                }
                div :global(pre) {
                  background-color: ${booleanValue ? '#f9fafb' : '#1f2937'};
                  color: ${booleanValue ? '#1f2937' : '#e5e7eb'};
                  padding: 1rem;
                  border-radius: 0.5rem;
                  overflow-x: auto;
                  margin: 1rem 0;
                }
                div :global(pre code) {
                  background-color: transparent;
                  padding: 0;
                }
                div :global(ul), div :global(ol) {
                  margin: 1rem 0;
                  padding-left: 1.5rem;
                }
                div :global(li) {
                  margin-bottom: 0.5rem;
                  color: ${booleanValue ? '#4b5563' : '#d1d5db'};
                }
                div :global(blockquote) {
                  border-left: 4px solid #b292ff;
                  padding-left: 1rem;
                  margin: 1rem 0;
                  font-style: italic;
                  color: ${booleanValue ? '#6b7280' : '#9ca3af'};
                }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            className="pb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/blog"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                booleanValue 
                  ? "bg-[#613cb8] text-white hover:bg-[#7c4dff] shadow-lg" 
                  : "bg-[#b292ff] text-black hover:bg-[#7feaff] shadow-xl"
              }`}
            >
              <ArrowLeft size={16} />
              Back to all blogs
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#b292ff] to-[#7feaff] rounded-full opacity-5 blur-3xl animate-[blob_7s_infinite]"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-[#7feaff] to-[#b292ff] rounded-full opacity-5 blur-3xl animate-[blob_8s_infinite]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-[#613cb8] to-[#b292ff] rounded-full opacity-5 blur-3xl animate-[blob_9s_infinite]"></div>
      </div>
    </motion.div>
    </>
  );
};

export default BlogDetailPage;
