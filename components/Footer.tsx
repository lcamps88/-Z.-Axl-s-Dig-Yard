import Link from "next/link";
import { Shovel, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gold">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + tagline */}
          <div className="md:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-dusk rounded-full flex items-center justify-center shadow-soft">
                <Shovel size={26} className="text-gold" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-dusk leading-tight">Z. Axl&apos;s</div>
                <div className="font-body text-[11px] font-bold tracking-widest uppercase text-dusk/70">Dig Yard</div>
              </div>
            </div>
            <p className="font-body text-dusk/75 text-sm leading-relaxed">
              All Rights Reserved | <Link href="/privacy" className="hover:underline">Privacy Policy</Link> | <Link href="/terms" className="hover:underline">ADA Compliance</Link>
            </p>
            <p className="font-body text-xs text-dusk/50 mt-3">
              Website by{" "}
              <span className="font-semibold text-dusk/70">Design Studio</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-dusk text-sm mb-5 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/our-mission" },
                { label: "Services", href: "/the-yard" },
                { label: "Contact Us", href: "/contact" },
                { label: "Resources", href: "/science-of-play" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-dusk/80 hover:text-dusk transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-display font-bold text-dusk text-sm mb-5 uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Play Options", href: "/play-options" },
                { label: "Memberships", href: "/play-options" },
                { label: "Birthday Parties", href: "/celebrations/birthdays" },
                { label: "Special Events", href: "/celebrations/special-events" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-dusk/80 hover:text-dusk transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-dusk text-sm mb-5 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-dusk mt-0.5 shrink-0" />
                <span className="font-body text-sm text-dusk/80 leading-relaxed">
                  20 Danbury Road South, Suite 52<br />
                  Bethel, CT 06801
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-dusk shrink-0" />
                <a href="tel:+12035550100" className="font-body text-sm text-dusk/80 hover:text-dusk transition-colors">
                  (203) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-dusk shrink-0" />
                <a href="mailto:hello@zaxlsdigyard.com" className="font-body text-sm text-dusk/80 hover:text-dusk transition-colors">
                  hello@zaxlsdigyard.com
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-dusk rounded-full flex items-center justify-center text-gold hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-dusk rounded-full flex items-center justify-center text-gold hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-dusk/20">
          <p className="font-body text-xs text-dusk/60 text-center">
            © {new Date().getFullYear()} Z. Axl&apos;s Dig Yard. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
