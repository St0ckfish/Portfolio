"use client";

// import AdminNavBar from "../../common/components/dashboard/AdminNav.tsx";
import { usePathname } from "next/navigation";
// import { Providers } from "./GlobalRedux/provider.tsx";

export default function EndUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  return (
    <>
      {/* <Providers> */}
        {/* Display the side bard*/}
        {/* {!isLoginPage && <AdminNavBar />} */}
        <div className={` ${isLoginPage ? "mt-[0px]" : "mt-[50px]"}`}>
          {/* Display The Navbar*/}
          {children}
        </div>
      {/* </Providers> */}
    </>
  );
}
