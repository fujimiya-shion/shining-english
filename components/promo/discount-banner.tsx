import { cn } from "@/lib/utils";

type DiscountBannerProps = {
  className?: string;
  code?: string;
  discount?: string;
  minOrder?: string;
};

export function DiscountBanner({
  className,
  code = "GIAM20K",
  discount = "20K",
  minOrder = "199K",
}: DiscountBannerProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-[28px] border-4 border-white bg-gradient-to-b from-[#FFC247] via-[#FFB034] to-[#FF8A1E] px-6 py-5 text-white shadow-[0_18px_45px_-20px_rgba(255,138,30,0.8)]",
        className
      )}
    >
      <div className="absolute -bottom-8 left-1/2 h-20 w-52 -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />
      <div className="absolute -inset-1 rounded-[30px] border-2 border-white/35" />

      <div className="relative z-10 flex justify-center">
        <div className="rounded-full border-2 border-white bg-white/10 px-6 py-1 text-center text-lg font-extrabold tracking-[0.2em] text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.45)]">
          {code}
        </div>
      </div>

      <div className="relative z-10 mt-4 text-center">
        <p className="text-xl font-semibold">Giam Ngay</p>
        <p className="mt-1 text-5xl font-extrabold leading-none">{discount}</p>
        <p className="mt-2 text-lg font-semibold italic">Don hang tu {minOrder}</p>
      </div>
    </div>
  );
}
