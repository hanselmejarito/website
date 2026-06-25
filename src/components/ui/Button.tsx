import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-chrome-black text-chrome-white hover:bg-chrome-gray-900",
  secondary: "bg-chrome-white text-chrome-black border border-chrome-black hover:bg-chrome-gray-100",
  ghost: "bg-transparent text-chrome-black hover:bg-chrome-gray-100",
  outline: "border border-chrome-white text-chrome-white hover:bg-chrome-white hover:text-chrome-black",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
