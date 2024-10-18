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

// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;

