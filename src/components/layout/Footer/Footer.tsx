import Image from "next/image";
import Link from "next/link";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

// ── TikTok icon (not in lucide-react) ────────────────────────────────────────
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.79a8.18 8.18 0 0 0 4.78 1.52V6.85a4.85 4.85 0 0 1-1.01-.16z" />
    </svg>
  );
}

// ── Zalo icon ─────────────────────────────────────────────────────────────────
function ZaloIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.5c-.4.4-1.1.6-1.8.6-.5 0-1-.1-1.4-.3l-3.3-1.7v.1c0 .8-.6 1.4-1.4 1.4H7.5c-.8 0-1.4-.6-1.4-1.4v-5c0-.8.6-1.4 1.4-1.4h1.1c.8 0 1.4.6 1.4 1.4v.4l2.9-1.5c.4-.2.9-.3 1.4-.3.7 0 1.4.2 1.8.6.5.5.8 1.1.8 1.8v3.5c0 .7-.2 1.4-.9 1.8zm-1.4-5c-.1-.1-.3-.2-.5-.2-.1 0-.3 0-.4.1l-3.5 1.8v1.2l3.5 1.8c.1.1.3.1.4.1.2 0 .4-.1.5-.2.2-.2.3-.4.3-.7v-3.5c0-.3-.1-.5-.3-.7z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook Gearvn", href: "https://facebook.com/gearvn", icon: Facebook },
  { label: "TikTok Gearvn", href: "https://tiktok.com/@gearvn", icon: TikTokIcon },
  { label: "Youtube Gearvn", href: "https://youtube.com/@gearvn", icon: Youtube },
  { label: "Zalo Gearvn", href: "https://zalo.me/gearvn", icon: ZaloIcon },
];

const HOTLINES = [
  { label: "Tư vấn mua hàng", number: "1900.5301" },
  { label: "Hỗ trợ kỹ thuật, bảo hành", number: "1900.5325" },
  { label: "Góp ý, khiếu nại", number: "1800.6173" },
  { label: "Email", number: "cskh@gearvn.com" },
];

// ── Payment logos — 100×40px PNG, nền trong ─────────────────────────────────
const PAYMENT_LOGOS = [
  { src: "/assets/images/payment/vnpay.png",       alt: "VNPay" },
  { src: "/assets/images/payment/momo.png",         alt: "MoMo" },
  { src: "/assets/images/payment/visa.png",         alt: "Visa" },
  { src: "/assets/images/payment/mastercard.png",   alt: "Mastercard" },
  { src: "/assets/images/payment/jcb.png",          alt: "JCB" },
  { src: "/assets/images/payment/napas.png",        alt: "Napas" },
  { src: "/assets/images/payment/zalopay.png",      alt: "ZaloPay" },
  { src: "/assets/images/payment/shopee-pay.png",   alt: "ShopeePay" },
];

// ── Shipping logos — 100×40px PNG, nền trong ─────────────────────────────────
const SHIPPING_LOGOS = [
  { src: "/assets/images/shipping/ghn.png",          alt: "Giao Hàng Nhanh" },
  { src: "/assets/images/shipping/ghtk.png",         alt: "Giao Hàng Tiết Kiệm" },
  { src: "/assets/images/shipping/viettel-post.png", alt: "Viettel Post" },
  { src: "/assets/images/shipping/vnpost.png",        alt: "VN Post" },
];

function LogoGrid({ logos }: { logos: { src: string; alt: string }[] }) {
  return (
    <div className="flex flex-wrap gap-[4px]">
      {logos.map(({ src, alt }) => (
        <div key={alt} className="w-[50px] h-[30px] rounded-[4px] bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
          <Image src={src} alt={alt} width={46} height={26} className="object-contain" />
        </div>
      ))}
    </div>
  );
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("w-full bg-[#0a0a0a]", className)}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px] pt-[48px] lg:pt-[96px] pb-[48px]">

        {/* ── Main columns ────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-[24px] border-b border-[#404040]">

          {/* Col 1 — Brand + Social */}
          <div className="flex flex-col gap-[24px] items-start shrink-0">
            {/* Logo */}
            <div className="relative w-[160px] h-[42px]">
              <Image
                src="/assets/images/logo-gearvn.svg"
                alt="GEARVN"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>

            {/* Social */}
            <div className="flex flex-col gap-[8px]">
              <p className="text-[16px] font-semibold text-white tracking-[-0.32px] leading-[20px]">
                KẾT NỐI VỚI CHÚNG TÔI
              </p>
              <div className="flex gap-[8px]">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="size-[32px] rounded-full flex items-center justify-center bg-white/20 text-white hover:bg-[var(--color-primary)] transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — Tổng đài hỗ trợ */}
          <div className="flex flex-col gap-[12px] shrink-0">
            <h3 className="text-[16px] font-semibold text-white tracking-[-0.32px] leading-[20px]">
              TỔNG ĐÀI HỖ TRỢ
            </h3>
            <div className="flex flex-col gap-[12px]">
              {HOTLINES.map(({ label, number }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#e5e5e5] leading-[18px]">{label}</span>
                  <span className="text-[14px] font-bold text-[#e5e5e5] leading-[20px]">{number}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Về Gearvn + Chính sách */}
          <div className="flex flex-col gap-[32px] shrink-0">
            {/* Về Gearvn */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[16px] font-semibold text-white tracking-[-0.32px] leading-[20px]">
                VỀ GEARVN
              </h3>
              <ul className="flex flex-col gap-[8px]">
                {[
                  { label: "Giới thiệu về công ty", href: "/gioi-thieu" },
                  { label: "Tuyển dụng", href: "/tuyen-dung" },
                  { label: "Liên hệ", href: "/lien-he" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-[14px] font-medium text-[#e5e5e5] leading-[18px] hover:text-white hover:underline underline-offset-2 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chính sách */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[16px] font-semibold text-white tracking-[-0.32px] leading-[20px]">
                CHÍNH SÁCH
              </h3>
              <ul className="flex flex-col gap-[8px]">
                {[
                  { label: "Chính sách bảo hành", href: "/chinh-sach-bao-hanh" },
                  { label: "Chính sách giao hàng", href: "/chinh-sach-giao-hang" },
                  { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-[14px] font-medium text-[#e5e5e5] leading-[18px] hover:text-white hover:underline underline-offset-2 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4 — Thông tin */}
          <div className="flex flex-col gap-[12px] shrink-0">
            <h3 className="text-[16px] font-semibold text-white tracking-[-0.32px] leading-[20px]">
              THÔNG TIN
            </h3>
            <ul className="flex flex-col gap-[8px]">
              {[
                { label: "Hệ thống cửa hàng", href: "/cua-hang" },
                { label: "Hướng dẫn mua hàng", href: "/huong-dan-mua-hang" },
                { label: "Hệ thống thanh toán", href: "/thanh-toan" },
                { label: "Hệ thống trả góp", href: "/tra-gop" },
                { label: "Tra cứu địa chỉ bảo hành", href: "/bao-hanh" },
                { label: "Build PC", href: "/build-pc" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[14px] font-medium text-[#e5e5e5] leading-[18px] hover:text-white hover:underline underline-offset-2 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Thanh toán + Vận chuyển */}
          <div className="flex flex-col gap-[32px] shrink-0">
            {/* Hỗ trợ thanh toán */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[16px] font-semibold text-white tracking-[-0.32px] leading-[20px]">
                HỖ TRỢ THANH TOÁN
              </h3>
              <LogoGrid logos={PAYMENT_LOGOS} />
            </div>

            {/* Đơn vị vận chuyển */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[16px] font-semibold text-white tracking-[-0.32px] leading-[20px]">
                ĐƠN VỊ VẬN CHUYỂN
              </h3>
              <LogoGrid logos={SHIPPING_LOGOS} />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="flex items-center justify-between py-[24px]">
          <p className="text-[12px] font-medium text-[#737373] leading-[16px]">
            Thông tin đăng ký và GPĐKKD của công ty sẽ điền ở đây
          </p>
          {/* Bộ Công Thương badge */}
          <div className="flex items-center gap-[6px] border border-[#404040] rounded-[4px] px-[8px] py-[4px]">
            <div className="size-[24px] rounded-full bg-[#1a56db] flex items-center justify-center shrink-0">
              <span className="text-white text-[8px] font-bold leading-none">✓</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-white leading-[10px] uppercase tracking-wide">Đã thông báo</span>
              <span className="text-[8px] text-[#737373] leading-[10px]">Bộ Công Thương</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
