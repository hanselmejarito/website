import Link from "next/link";
import { footerLinks, socialLinks, paymentMethods } from "@/lib/data";
import { NewsletterForm } from "./NewsletterForm";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  return (
    <footer className="bg-ink text-canvas-white">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-16">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-signal-bright">
              Stay in the lane
            </p>
            <h2 className="mt-3 font-display text-display-md text-balance">
              New drops. First word.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-canvas-white/55">
              Release notes and early access — no spam, no filler.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-14 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <BrandLogo variant="onDark" height={48} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-canvas-white/55">
              Honest Mistake — race-street pieces from Manila heat. Limited drops
              only.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal-bright">
            Free shipping on ₱1,500+
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas-white/40">
              Support
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas-white/65 transition-colors hover:text-canvas-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas-white/40">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas-white/65 transition-colors hover:text-canvas-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas-white/40">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas-white/65 transition-colors hover:text-canvas-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-canvas-white/55 transition-colors hover:text-canvas-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" aria-label="Payment methods">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="border border-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-canvas-white/55"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-canvas-white/40">Manila · Philippines · PHP</p>
            <p className="text-xs text-canvas-white/40">
              &copy; {new Date().getFullYear()} Honest Mistake
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
