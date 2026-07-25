import Link from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "link" | "onDark";

const variants: Record<Variant, string> = {
  primary:
    "relative overflow-hidden bg-signal text-canvas-white hover:bg-signal-deep",
  secondary:
    "bg-canvas-white text-ink border border-ink hover:bg-ink hover:text-canvas-white",
  ghost: "bg-transparent text-ink hover:bg-canvas-deep",
  outline:
    "border border-canvas-white/25 bg-canvas-white text-ink hover:border-signal hover:bg-signal hover:text-canvas-white",
  link: "bg-transparent px-0 py-0 text-ink border-b border-ink/30 rounded-none hover:border-signal hover:text-signal",
  onDark:
    "relative overflow-hidden bg-signal text-canvas-white hover:bg-signal-deep",
};

type SharedProps = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
  wipe?: boolean;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      href,
      children,
      className = "",
      wipe = false,
      ...props
    },
    ref
  ) {
    const showWipe = wipe || variant === "primary" || variant === "onDark";
    const classes = `group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;

    const content = (
      <>
        <span className="relative z-10 inline-flex items-center gap-3">
          {children}
        </span>
        {showWipe && (
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-signal-bright transition-transform duration-500 ease-outExpo group-hover:translate-y-0"
          />
        )}
      </>
    );

    if (href) {
      const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <Link href={href} className={classes} {...linkProps}>
          {content}
        </Link>
      );
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref} className={classes} {...buttonProps}>
        {content}
      </button>
    );
  }
);
