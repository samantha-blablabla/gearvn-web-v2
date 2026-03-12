import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryTabsProps {
  className?: string;
}

const TABS = [
  {
    label: "Tất cả danh mục khuyến mãi",
    href: "/khuyen-mai",
    icon: "/assets/icons/category-tabs/tag.svg",
  },
  {
    label: "Tin tức, review sản phẩm",
    href: "/tin-tuc",
    icon: "/assets/icons/category-tabs/paper-airplane.svg",
  },
  {
    label: "Tra Cứu Bảo Hành",
    href: "/bao-hanh",
    icon: "/assets/icons/category-tabs/wrench-screwdriver.svg",
  },
  {
    label: "Tra Cứu Hóa Đơn",
    href: "/hoa-don",
    icon: "/assets/icons/category-tabs/document-duplicate.svg",
  },
  {
    label: "Hệ Thống Showroom",
    href: "/showroom",
    icon: "/assets/icons/category-tabs/map-pin.svg",
  },
];

export function CategoryTabs({ className }: CategoryTabsProps) {
  return (
    <nav
      className={cn(
        "w-full bg-[var(--color-surface)] hidden md:block",
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px] h-[56px] md:h-[66px] flex items-center gap-2 md:justify-between overflow-x-auto scrollbar-hide">
        {TABS.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 px-2 md:px-3 py-[10px] rounded-[8px]",
              "text-[13px] md:text-[16px] font-semibold leading-[22px] text-[var(--color-text-figma-primary)]",
              "hover:bg-[var(--color-surface-subtle)] transition-colors",
              "whitespace-nowrap shrink-0"
            )}
          >
            <div className="relative size-5 shrink-0">
              <Image
                src={icon}
                alt=""
                fill
                className="object-contain"
                sizes="20px"
              />
            </div>
            <span className="hidden md:inline">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
