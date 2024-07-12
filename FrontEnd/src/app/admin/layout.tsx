"use client";

import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import { usePathname } from "next/navigation";

export default function EndUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";
  return (
    <>
      {/* <Providers> */}
        <div className={` ${isLoginPage ? "mt-[0px]" : "mt-[50px]"} text-white`}>
          {children}
        </div>
      {/* </Providers> */}
    </>
  );
}
