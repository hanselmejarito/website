import Image from "next/image";
import Link from "next/link";

type Variant = "color" | "onDark" | "mono" | "wide";

/** Transparent PNGs — use color on light surfaces, onDark/mono on dark */
const sources: Record<
  Variant,
  { src: string; alt: string; ratio: number }
> = {
  color: { src: "/brand/HM.png", alt: "HM", ratio: 677 / 436 },
  onDark: { src: "/brand/HM2.png", alt: "HM", ratio: 711 / 460 },
  mono: { src: "/brand/HM3.png", alt: "HM", ratio: 678 / 437 },
  wide: { src: "/brand/HM4.png", alt: "HM", ratio: 1382 / 890 },
};

type Props = {
  variant?: Variant;
  href?: string | null;
  className?: string;
  /** Display height in px */
  height?: number;
  priority?: boolean;
};

export function BrandLogo({
  variant = "color",
  href = "/",
  className = "",
  height = 36,
  priority = false,
}: Props) {
  const { src, alt, ratio } = sources[variant];
  const width = Math.round(height * ratio);

  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
      style={{ height, width: "auto" }}
    />
  );

  if (href === null) return image;

  return (
    <Link href={href} aria-label="Honest Mistake home" className="inline-flex items-center">
      {image}
    </Link>
  );
}
