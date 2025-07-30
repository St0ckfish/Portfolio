"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetCurrentUserQuery, useSignOutMutation } from "@/store/api/authApi";
import { BookOpenText, DoorOpen, ChevronsLeft, ChevronsRight } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { data: user, isLoading, error } = useGetCurrentUserQuery();
  const [signOut, { isLoading: isSigningOut }] = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const menuItems = [
    {
      icon: <BookOpenText />,
      label: "Blogs",
      href: "/admin/blogs",
    },
  ];

  if (error) {
    return null;
  }

  const baseImageUrl = "https://portfolio-backend-rxwc.onrender.com";
  const fullImageUrl = user?.imageUrl && !imageError
    ? (user.imageUrl.startsWith('http') ? user.imageUrl : `${baseImageUrl}${user.imageUrl}`)
    : "/images/default-avatar.png";

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 shadow-sm transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className={`${isCollapsed ? "h-16 flex items-center justify-center" : "p-6"} border-b border-gray-200`}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-gray-800 text-xl font-semibold">Admin</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className={`${isCollapsed ? "h-16 flex items-center justify-center" : "p-6"} border-b border-gray-200`}>
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}>
          <div className="relative">
            {isLoading ? (
              <div className={`${isCollapsed ? "w-8 h-8" : "w-12 h-12"} rounded-full bg-gray-200 animate-pulse`}/>
            ) : (
              <Image
                src={fullImageUrl}
                alt={user?.name || "User avatar"}
                width={isCollapsed ? 32 : 48}
                height={isCollapsed ? 32 : 48}
                className={`rounded-full object-cover ${isCollapsed ? "w-8 h-8" : "w-12 h-12"}`}
                onError={() => setImageError(true)}
              />
            )}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"/>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </>
              ) : (
                <>
                  <h3 className="text-gray-800 font-medium text-sm truncate">{user?.name}</h3>
                  <p className="text-gray-500 text-xs truncate">@{user?.username}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors ${
                  isCollapsed ? "justify-center" : "space-x-3"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={`w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors ${
            isCollapsed ? "justify-center" : "space-x-3"
          } ${isSigningOut ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span className="text-lg"><DoorOpen /></span>
          {!isCollapsed && (
            <span className="font-medium">
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;