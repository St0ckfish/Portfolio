"use client";

import WithAuth from "@/components/dashboard/Auth/WithAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/signup";
  
  return (
    <div className="bg-white min-h-screen">
      <div className={`${isAuthPage ? "mt-[0px]" : ""} `}>
        <WithAuth excludePaths={["/admin/login", "/admin/signup"]}>
          {!isAuthPage && <Sidebar />}
          <div className={`${!isAuthPage ? "ml-64" : ""}`}>
            {children}
          </div>
        </WithAuth>
      </div>
    </div>
  );
}
