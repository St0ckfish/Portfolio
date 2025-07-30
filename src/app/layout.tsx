"use client"
import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { Providers } from "@/GlobalRedux/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
        <title>Mostapha Taha</title>
        <meta name="description" content="During these 4 years as Front-End Software Engineer. My role has extended beyond coding to effective communication with various departments, to define new features and spearheading the development of new apps." />
        <link rel="icon" type="image/x-icon" href="/images/Stockfish.jpg" />
      </head>
      <body className="bg-[#0c0c0d] selection:text-black selection:bg-[#7feaff]">

        <Providers>
          {!isLoginPage && <NavBar />}
          {children}
          {!isLoginPage && <Footer />}
        </Providers>

      </body>
    </html>
  );
}
