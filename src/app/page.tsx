import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { ProductTabSection } from "@/components/home/ProductTabSection";
import { BrandSection } from "@/components/home/BrandSection";
import { CateShowcase } from "@/components/home/CateShowcase";
import { NewsSection } from "@/components/home/NewsSection";
import { ReviewSection } from "@/components/home/ReviewSection";
import type { Product } from "@/types";

// ─── Mock data (replace with real API calls) ────────────────────────────────

const flashSaleProducts: Product[] = [
  {
    id: "fs-1",
    name: "Laptop ASUS ROG Zephyrus G14 GA402XV (Ryzen 9 7940HS/16GB/1TB/RTX4060)",
    slug: "asus-rog-zephyrus-g14-ga402xv",
    imageUrl: "/assets/images/placeholder-product.svg",
    price: 29990000,
    originalPrice: 35490000,
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
  },
  {
    id: "fs-2",
    name: "Màn hình ASUS ROG Swift PG27UQ 27 inch 4K 144Hz IPS",
    slug: "asus-rog-pg27uq",
    imageUrl: "/assets/images/placeholder-product.svg",
    price: 18500000,
    originalPrice: 22000000,
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: "fs-3",
    name: "Bàn phím cơ ASUS ROG Strix Scope RX TKL",
    slug: "asus-rog-strix-scope-rx-tkl",
    imageUrl: "/assets/images/placeholder-product.svg",
    price: 2490000,
    originalPrice: 3190000,
    rating: 4.6,
    reviewCount: 412,
    inStock: true,
  },
  {
    id: "fs-4",
    name: "Chuột ASUS ROG Keris Wireless AimPoint",
    slug: "asus-rog-keris-wireless",
    imageUrl: "/assets/images/placeholder-product.svg",
    price: 1690000,
    originalPrice: 2290000,
    rating: 4.7,
    reviewCount: 318,
    inStock: true,
  },
  {
    id: "fs-5",
    name: "Tai nghe ASUS ROG Delta S Wireless",
    slug: "asus-rog-delta-s-wireless",
    imageUrl: "/assets/images/placeholder-product.svg",
    price: 3290000,
    originalPrice: 4490000,
    rating: 4.5,
    reviewCount: 176,
    inStock: true,
  },
  {
    id: "fs-6",
    name: "Laptop Lenovo Legion 5i Pro Gen 8 (i7-13700HX/16GB/512GB/RTX4060)",
    slug: "lenovo-legion-5i-pro-gen8",
    imageUrl: "/assets/images/placeholder-product.svg",
    price: 27490000,
    originalPrice: 31990000,
    rating: 4.6,
    reviewCount: 143,
    inStock: true,
  },
];

// Sale ends tomorrow at midnight
const flashSaleEnd = new Date();
flashSaleEnd.setDate(flashSaleEnd.getDate() + 1);
flashSaleEnd.setHours(23, 59, 59, 0);

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CategoryTabs />

      <main className="overflow-x-hidden">
        {/* Hero: sidebar menu + banners */}
        <HeroBanner />

        {/* Flash Sale — HotDeals */}
        <FlashSaleSection
          products={flashSaleProducts}
          endTime={flashSaleEnd}
        />

        {/* Danh Mục Nổi Bật — 20 category icon cards */}
        <FeaturedCategories />

        {/* SideBar & Banner — tabbed product section (Laptop/PC/Màn hình/Gaming Gear) */}
        <ProductTabSection />

        {/* Danh Mục Hãng — brand logo grid */}
        <BrandSection />

        {/* CateShowcase — top banners + Chuột/Laptop Bán Chạy Nhất */}
        <CateShowcase />

        {/* Tin Tức & Blog */}
        <NewsSection />

        {/* Góc Review Thực Tế + Video Review Sản Phẩm */}
        <ReviewSection />
      </main>

      <Footer />
    </>
  );
}
