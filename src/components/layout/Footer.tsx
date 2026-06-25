import Link from "next/link";
import { footerLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-chrome-black text-chrome-white mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-chrome-gray-400 hover:text-chrome-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-chrome-gray-400 hover:text-chrome-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-chrome-gray-400 hover:text-chrome-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-chrome-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-chrome-gray-400">United States (USD $)</p>
          <p className="text-sm text-chrome-gray-400">
            &copy; {new Date().getFullYear()}, Chrome Industries.
          </p>
        </div>
      </div>
    </footer>
  );
}
