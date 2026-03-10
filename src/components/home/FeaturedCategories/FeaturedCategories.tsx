import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FeaturedCategoriesProps {
  className?: string;
}

interface CategoryItem {
  label: string;
  slug: string;
  imageUrl: string;
}

const CATEGORIES: CategoryItem[] = [
  { label: "Laptop", slug: "laptop", imageUrl: "/assets/images/categories/laptop.png" },
  { label: "PC", slug: "pc", imageUrl: "/assets/images/categories/pc.png" },
  { label: "Mainboard", slug: "mainboard", imageUrl: "/assets/images/categories/mainboard.png" },
  { label: "CPU", slug: "cpu", imageUrl: "/assets/images/categories/cpu.png" },
  { label: "VGA", slug: "vga", imageUrl: "/assets/images/categories/vga.png" },
  { label: "Case", slug: "case", imageUrl: "/assets/images/categories/case.png" },
  { label: "Nguồn", slug: "nguon", imageUrl: "/assets/images/categories/nguon.png" },
  { label: "Tản", slug: "tan-nhiet", imageUrl: "/assets/images/categories/tan.png" },
  { label: "RAM", slug: "ram", imageUrl: "/assets/images/categories/ram.png" },
  { label: "Ổ cứng", slug: "o-cung", imageUrl: "/assets/images/categories/o-cung.png" },
  { label: "Màn hình", slug: "man-hinh", imageUrl: "/assets/images/categories/man-hinh.png" },
  { label: "Bàn phím", slug: "ban-phim", imageUrl: "/assets/images/categories/ban-phim.png" },
  { label: "Chuột", slug: "chuot", imageUrl: "/assets/images/categories/chuot.png" },
  { label: "Tai nghe", slug: "tai-nghe", imageUrl: "/assets/images/categories/tai-nghe.png" },
  { label: "Ghế", slug: "ghe-gaming", imageUrl: "/assets/images/categories/ghe.png" },
  { label: "Loa", slug: "loa", imageUrl: "/assets/images/categories/loa.png" },
  { label: "Sạc", slug: "sac", imageUrl: "/assets/images/categories/sac.png" },
  { label: "Phụ kiện", slug: "phu-kien", imageUrl: "/assets/images/categories/phu-kien.png" },
  { label: "Thiết bị VP", slug: "thiet-bi-van-phong", imageUrl: "/assets/images/categories/thiet-bi-vp.png" },
  { label: "Console", slug: "console", imageUrl: "/assets/images/categories/console.png" },
];

export function FeaturedCategories({ className }: FeaturedCategoriesProps) {
  return (
    <section
      className={cn("bg-[var(--color-surface-subtle)] py-8 lg:py-[32px]", className)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]">
        <div className="flex flex-col gap-4 items-start">
          {/* Section title */}
          <h2 className="text-[18px] md:text-[20px] font-semibold leading-[26px] text-[var(--color-text-figma-primary)] whitespace-nowrap">
            Danh Mục Nổi Bật
          </h2>

          {/* Category grid */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={cn(
                  "flex flex-col items-center justify-center gap-2",
                  "w-[calc((100%-32px)/3)] md:w-[110px] h-[120px]",
                  "bg-[var(--color-surface)] border border-[#e5e5e5] rounded-[8px]",
                  "px-2 py-4",
                  "transition-shadow duration-200 hover:shadow-md"
                )}
              >
                {/* Category image */}
                <div className="relative size-[70px] overflow-hidden">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.label}
                    fill
                    className="object-contain"
                    sizes="70px"
                  />
                </div>

                {/* Category label */}
                <span className="text-[14px] font-medium leading-[18px] text-[var(--color-text-figma-primary)] text-center">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
