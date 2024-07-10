import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mostapha Taha",
  description: "Mostapha Taha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Mostapha Taha</title>
        <meta name="description" content="Mostapha Taha" />
        <link rel="icon" type="image/x-icon" href="/images/Stockfish.jpg" />
      </head>
      <body className="bg-[#0c0c0d] selection:text-black selection:bg-[#7feaff]">
        
        <NavBar/>
        {children}
        
        </body>
    </html>
  );
}
