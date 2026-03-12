import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CategoryMenuProvider } from "@/components/layout/CategoryMenuContext";
import { CartProvider } from "@/components/layout/CartContext";
import { CartPanel } from "@/components/cart/CartPanel";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GEARVN — Thiết bị Gaming & Công nghệ chính hãng",
  description:
    "Mua laptop, màn hình, bàn phím, chuột, tai nghe, ghế gaming chính hãng giá tốt nhất tại Việt Nam. Bảo hành chính hãng, giao hàng toàn quốc.",
  keywords: "laptop gaming, màn hình gaming, bàn phím cơ, chuột gaming, tai nghe gaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        <CartProvider>
          <CategoryMenuProvider>{children}</CategoryMenuProvider>
          <CartPanel />
        </CartProvider>
      </body>
    </html>
  );
}
