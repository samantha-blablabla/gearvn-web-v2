import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl: string;
  tag?: string;
  href: string;
}

export interface NewsSectionProps {
  featuredArticle?: NewsArticle;
  recentArticles?: NewsArticle[];
  className?: string;
}

const DEFAULT_FEATURED: NewsArticle = {
  id: "featured-1",
  title: "RTX 5090 chính thức ra mắt — Hiệu năng gấp đôi thế hệ trước",
  excerpt: "NVIDIA vừa trình làng dòng GPU GeForce RTX 5090 với kiến trúc Blackwell hoàn toàn mới, hứa hẹn hiệu năng gaming và AI vượt trội.",
  imageUrl: "/assets/images/news/news-featured.svg",
  tag: "TechNews",
  href: "/tin-tuc/rtx-5090-ra-mat",
};

const DEFAULT_RECENT: NewsArticle[] = [
  {
    id: "recent-1",
    title: "Top 10 laptop gaming đáng mua nhất 2025 cho sinh viên",
    imageUrl: "/assets/images/news/news-1.svg",
    href: "/tin-tuc/top-10-laptop-gaming-2025",
  },
  {
    id: "recent-2",
    title: "So sánh AMD Ryzen 9 9950X vs Intel Core Ultra 9 285K — Ai mới là vua?",
    imageUrl: "/assets/images/news/news-2.svg",
    href: "/tin-tuc/so-sanh-ryzen-9-vs-intel-ultra-9",
  },
];

// ── Shared ThumbNews card for mobile horizontal scroll ──────────────────────
function ThumbNewsCard({
  article,
  height = "h-[169px]",
}: {
  article: NewsArticle;
  height?: string;
}) {
  return (
    <Link
      href={article.href}
      className={cn(
        "relative shrink-0 w-[300px] rounded-[16px] overflow-hidden block group",
        height
      )}
    >
      <Image
        src={article.imageUrl}
        alt={article.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 pb-[12px] px-[16px]">
        <div className="bg-[rgba(0,0,0,0.1)] rounded-[12px] p-[12px] flex items-center gap-3 backdrop-blur-sm">
          <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.28px] text-white line-clamp-2 flex-1 min-w-0">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export function NewsSection({
  featuredArticle = DEFAULT_FEATURED,
  recentArticles = DEFAULT_RECENT,
  className,
}: NewsSectionProps) {
  // All articles combined for mobile "Tin Tức Nổi Bật" row
  const allFeatured = [featuredArticle, ...recentArticles.slice(0, 1)];

  return (
    <section
      className={cn("bg-[var(--color-surface-subtle)] py-[16px] lg:py-[32px]", className)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px] flex flex-col gap-[24px] lg:gap-8">
        {/* Top banner — desktop only (hidden on mobile per Figma) */}
        <Link
          href="/tin-tuc"
          className="relative w-full h-[200px] rounded-[12px] overflow-hidden bg-[var(--color-surface-muted)] hidden lg:block group"
        >
          <Image
            src="/assets/images/banners/news-top-banner.png"
            alt="Cập nhật Tin Tức Công Nghệ mới nhất cùng Gearvn"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1440px) 100vw, 1200px"
          />
        </Link>

        {/* ── MOBILE layout: Two horizontal scroll rows ── */}
        <div className="flex flex-col gap-[24px] lg:hidden">
          {/* Tin Tức Nổi Bật — horizontal scroll */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-[20px] font-semibold leading-[26px] text-[var(--color-text-figma-primary)]">
              Tin Tức Nổi Bật
            </h2>
            <div className="flex gap-[12px] overflow-x-auto scrollbar-hide -mx-4 px-4">
              {allFeatured.map((article) => (
                <ThumbNewsCard key={article.id} article={article} height="h-[169px]" />
              ))}
            </div>
          </div>

          {/* Bài Viết Mới — horizontal scroll */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-[20px] font-semibold leading-[26px] text-[var(--color-text-figma-primary)]">
              Bài Viết Mới
            </h2>
            <div className="flex gap-[12px] overflow-x-auto scrollbar-hide -mx-4 px-4">
              {recentArticles.map((article) => (
                <ThumbNewsCard key={article.id} article={article} height="h-[168px]" />
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP layout: Featured article + sidebar ── */}
        <div className="hidden lg:flex lg:flex-row gap-[24px] items-start">
          {/* Left: Tin Tức Nổi Bật */}
          <div className="flex flex-col gap-[16px] flex-1 min-w-0">
            <h2 className="text-[24px] font-semibold leading-[28px] text-[var(--color-text-figma-primary)]">
              Tin Tức Nổi Bật
            </h2>

            <Link
              href={featuredArticle.href}
              className="relative w-full h-[444px] rounded-[16px] overflow-hidden block group"
            >
              <Image
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="790px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 pb-6 px-[32px]">
                <div className="bg-[rgba(0,0,0,0.1)] rounded-[16px] px-[32px] py-[24px] flex items-start justify-between gap-4 backdrop-blur-sm">
                  <div className="flex flex-col gap-3 flex-1 min-w-0">
                    {featuredArticle.tag && (
                      <span className="inline-flex bg-[var(--color-surface-subtle)] rounded-full px-[6px] py-[2px] text-[12px] font-semibold leading-[16px] text-[var(--color-text-figma-primary)] w-fit">
                        {featuredArticle.tag}
                      </span>
                    )}
                    <h3 className="text-[24px] font-semibold leading-[28px] text-white line-clamp-2">
                      {featuredArticle.title}
                    </h3>
                    {featuredArticle.excerpt && (
                      <p className="text-[13px] font-medium leading-[18px] text-[#e5e5e5] line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center justify-center size-[44px] bg-[rgba(255,255,255,0.1)] rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
                    <ChevronRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right: Bài Viết Mới */}
          <div className="flex flex-col gap-[16px] w-[374px] shrink-0">
            <h2 className="text-[24px] font-semibold leading-[28px] text-[var(--color-text-figma-primary)]">
              Bài Viết Mới
            </h2>

            <div className="flex flex-col gap-6">
              {recentArticles.slice(0, 2).map((article) => (
                <Link
                  key={article.id}
                  href={article.href}
                  className="relative w-full h-[210px] rounded-[16px] overflow-hidden block group"
                >
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="374px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 pb-3 px-4">
                    <div className="bg-[rgba(0,0,0,0.1)] rounded-[12px] p-3 flex items-center justify-between gap-3 backdrop-blur-sm">
                      <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.28px] text-white line-clamp-2 flex-1 min-w-0">
                        {article.title}
                      </h3>
                      <div className="shrink-0 flex items-center justify-center size-[36px] bg-[rgba(255,255,255,0.1)] rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
                        <ChevronRight size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
