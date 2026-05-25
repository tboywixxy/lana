import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { SearchProvider } from "@/components/SearchContext";

export const metadata: Metadata = {
  title: "LANA Store",
  description: "Simple premium online store",
  icons: {
    icon: '/lana-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <CartProvider>
          <SearchProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
