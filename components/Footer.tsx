import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/public/footer-logo.png";
import Image from "next/image";

const QUICK_LINKS = [
  { label: "About Us", href: "/our-mission" },
  { label: "Services", href: "/the-yard" },
  { label: "Contact Us", href: "/contact" },
  { label: "Resources", href: "/science-of-play" },
];

const SERVICE_LINKS = [
  { label: "Play Options", href: "/play-options" },
  { label: "Memberships", href: "/play-options" },
  { label: "Birthday Parties", href: "/celebrations/birthdays" },
  { label: "Special Events", href: "/celebrations/special-events" },
];

function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-quicksand font-bold text-xs uppercase tracking-widest mb-3" style={{ color: "#B5934A" }}>
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer>
      {/* Main section — white background */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_1fr_1fr] gap-10 items-start">

            {/* Logo */}
            <div className="rounded-sm overflow-hidden">
              <Image
                src={Logo}
                alt="Z. Axl's Dig Yard Logo"
                width={280}
                height={280}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-script text-2xl mb-5" style={{ color: "#E8896A" }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-quicksand font-bold text-sm uppercase text-nav-text hover:opacity-60 transition-opacity tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="font-script text-2xl mb-5" style={{ color: "#C49A2A" }}>
                Our Services
              </h4>
              <ul className="space-y-3">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-quicksand font-bold text-sm uppercase text-nav-text hover:opacity-60 transition-opacity tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="space-y-5">
              {/* Address */}
              <div>
                <FooterLabel>Address</FooterLabel>
                <p className="font-quicksand text-sm text-nav-text leading-relaxed">
                  20 Danbury Road South, Suite 52<br />
                  Bethel, CT 06801
                </p>
              </div>

              {/* Phone + Social row */}
              <div className="flex items-start gap-10">
                <div>
                  <FooterLabel>Phone</FooterLabel>
                  <a
                    href="tel:+12035550100"
                    className="font-quicksand text-sm text-nav-text hover:opacity-60 transition-opacity"
                  >
                    (203) 555-0100
                  </a>
                </div>
                <div>
                  <FooterLabel>Connect With Us</FooterLabel>
                  <div className="flex gap-2.5 mt-1">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-light-blue rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-light-blue rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — dark navy */}
      <div className="bg-light-blue">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-quicksand text-white text-sm text-center md:text-left">
            © {new Date().getFullYear()} Z. Axl&apos;s Dig Yard. All Rights Reserved.{" "}
            <span className="hidden md:inline">|</span>{" "}
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>{" "}
            |{" "}
            <Link href="/terms" className="hover:text-white transition-colors">ADA Compliance</Link>
          </p>
          <p className="font-quicksand text-white/60 text-sm whitespace-nowrap">
            Website by:{" "}
            <span className="text-white/80 font-semibold">Digital Resource</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
