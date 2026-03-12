import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BrandSectionProps {
  className?: string;
}

interface BrandItem {
  name: string;
  slug: string;
  logoUrl: string;
}

const BRANDS: BrandItem[] = [
  { name: "ASUS", slug: "asus", logoUrl: "/assets/images/brands/asus.png" },
  { name: "Acer", slug: "acer", logoUrl: "/assets/images/brands/acer.png" },
  { name: "MSI", slug: "msi", logoUrl: "/assets/images/brands/msi.png" },
  { name: "Razer", slug: "razer", logoUrl: "/assets/images/brands/razer.png" },
  { name: "GIGABYTE", slug: "gigabyte", logoUrl: "/assets/images/brands/gigabyte.png" },
  { name: "Lenovo", slug: "lenovo", logoUrl: "/assets/images/brands/lenovo.png" },
  { name: "ViewSonic", slug: "viewsonic", logoUrl: "/assets/images/brands/viewsonic.png" },
  { name: "Corsair", slug: "corsair", logoUrl: "/assets/images/brands/corsair.png" },
  { name: "Logitech", slug: "logitech", logoUrl: "/assets/images/brands/logitech.png" },
  { name: "Akko", slug: "akko", logoUrl: "/assets/images/brands/akko.png" },
  { name: "EDRA", slug: "edra", logoUrl: "/assets/images/brands/edra.png" },
  { name: "SteelSeries", slug: "steelseries", logoUrl: "/assets/images/brands/steelseries.png" },
];

export function BrandSection({ className }: BrandSectionProps) {
  return (
    <section
      className={cn("bg-[var(--color-surface-subtle)] py-8 lg:py-[32px]", className)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 items-start">
          {/* ── Left Banner ── */}
          <div className="relative w-full lg:w-[478px] lg:shrink-0 h-[160px] lg:h-[239px] rounded-[12px] overflow-hidden bg-[var(--color-surface-muted)]">
            <Image
              src="/assets/images/banners/brand-main-1.jpg"
              alt="Danh mục hãng"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 478px"
            />

            {/* Pagination dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-[6px] bg-[rgba(229,229,229,0.02)] px-2 py-1 rounded-full shadow-sm">
              <span className="block w-[16px] h-[6px] rounded-full bg-[#e5e5e5]" />
              <span className="block size-[6px] rounded-full bg-[#d4d4d4] opacity-60" />
              <span className="block size-[6px] rounded-full bg-[#d4d4d4] opacity-60" />
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            {/* Title */}
            <h2 className="text-[20px] lg:text-[24px] font-semibold leading-[28px] text-[var(--color-text-figma-primary)]">
              Danh Mục Hãng
            </h2>

            {/* Brand grid + nav arrows */}
            <div className="relative">
              {/* Nav arrows (desktop only) */}
              <button
                aria-label="Trước"
                className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 size-[42px] items-center justify-center rounded-full bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Grid: 2 cols mobile, 4 cols desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {BRANDS.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/hang/${brand.slug}`}
                    className={cn(
                      "flex items-center justify-center",
                      "h-[60px] bg-[var(--color-surface)] border border-[#e5e5e5] rounded-[8px] p-2",
                      "hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    )}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={brand.logoUrl}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) calc(50vw - 24px), 184px"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <button
                aria-label="Tiếp"
                className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 size-[42px] items-center justify-center rounded-full bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] transition-all duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
