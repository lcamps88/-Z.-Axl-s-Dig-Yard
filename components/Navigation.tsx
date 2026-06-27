"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo-z-axl_dig_yard.png";
import type { User } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LEFT = [
  { label: "Home", href: "/" },
  { label: "Our Mission", href: "/our-mission" },
  {
    label: "Why The Yard",
    href: "/the-yard",
    children: [
      { label: "The Emotion Selection Tunnel", href: "/the-yard#tunnel" },
      { label: "Cues to Connect", href: "/the-yard#cues" },
      { label: "Curated Play Sessions", href: "/the-yard#sessions" },
      { label: "A Framework, Not a Formula", href: "/the-yard#framework" },
    ],
  },
  { label: "Plan Your Visit", href: "/plan-your-visit" },
];

const NAV_RIGHT = [
  {
    label: "Play & Celebrations",
    href: "/celebrations",
    children: [
      { label: "Play Options & Memberships", href: "/play-options" },
      { label: "Special Events", href: "/celebrations/special-events" },
      { label: "Boutique Birthdays", href: "/celebrations/birthdays" },
      { label: "Birthday FAQs", href: "/celebrations/birthday-faqs" },
      { label: "Programming", href: "/programming" },
    ],
  },
  { label: "Memberships", href: "/play-options" },
  { label: "Contact", href: "/contact" },
];

function NavItem({
  item,
  openDropdown,
  setOpenDropdown,
  pathname,
}: {
  item: (typeof NAV_LEFT)[number];
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
  pathname: string;
}) {
  if (!("children" in item) || !item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "font-quicksand font-bold text-sm uppercase text-nav-text hover:opacity-70 transition-opacity whitespace-nowrap px-1",
          pathname === item.href && "opacity-70"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
        className={cn(
          "flex items-center gap-1 font-quicksand font-bold text-sm uppercase text-nav-text hover:opacity-70 transition-opacity whitespace-nowrap px-1"
        )}
      >
        {item.label}
        <ChevronDown
          size={15}
          className={cn("transition-transform duration-200", openDropdown === item.label && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {openDropdown === item.label && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-white rounded-2xl shadow-card-hover py-2 border border-light-gray z-50"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-5 py-2.5 font-quicksand font-semibold text-sm text-nav-text hover:bg-gold-light transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null)
    );
    return () => listener.subscription.unsubscribe();
  }, [supabase.auth]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      {/* Desktop pill navbar */}
      <nav
        ref={dropdownRef}
        className="hidden lg:flex items-center justify-between max-w-[1400px] mx-auto bg-nav-gold px-10 py-2 gap-3"
        style={{ borderRadius: "8.75rem", overflow: "visible" }}
      >
        {/* Left nav items */}
        <div className="flex items-center gap-4">
          {NAV_LEFT.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              pathname={pathname}
            />
          ))}
        </div>

        {/* Center logo */}
        <Link href="/" className="flex-shrink-0 mx-3">
          <div
            className="flex items-center justify-center bg-white rounded-full shadow-soft border-4 border-white"
            style={{ width: "5.5rem", height: "5.5rem", marginTop: "-1.25rem", marginBottom: "-1.25rem" }}
          >
            <Image src={Logo} alt="Z. Axl's Dig Yard Logo" width={88} height={88} className="w-full h-full object-contain rounded-full" />
          </div>
        </Link>

        {/* Right nav items */}
        <div className="flex items-center gap-4">
          {NAV_RIGHT.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              pathname={pathname}
            />
          ))}

          {/* Portal button */}
          <Link
            href={user ? "/portal" : "/login"}
            className="ml-2 font-quicksand font-bold text-sm uppercase text-white bg-nav-text px-5 py-2.5 whitespace-nowrap hover:opacity-80 transition-opacity"
            style={{ borderRadius: "8.75rem" }}
          >
            {user ? "My Portal" : "Membership Portal"}
          </Link>
        </div>
      </nav>

      {/* Mobile bar */}
      <div
        className="lg:hidden flex items-center justify-between bg-nav-gold px-5 py-3"
        style={{ borderRadius: "8.75rem" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col items-center justify-center bg-white rounded-full w-10 h-10 border-2 border-white">
            <svg viewBox="0 0 44 36" fill="none" className="w-6 h-5">
              <rect x="3" y="18" width="22" height="10" rx="2.5" fill="#1E2D40"/>
              <rect x="5" y="20" width="8" height="6" rx="1.5" fill="#F0F5F9"/>
              <rect x="24" y="15" width="12" height="5" rx="1.5" fill="#1E2D40"/>
              <path d="M24 15 L36 8 L36 15" fill="#3A6347"/>
              <rect x="3" y="28" width="32" height="3.5" rx="1.75" fill="#1E2D40"/>
              <circle cx="8" cy="29" r="3" fill="#4A7C59"/>
              <circle cx="28" cy="29" r="3" fill="#4A7C59"/>
            </svg>
          </div>
          <span className="font-quicksand font-bold text-nav-text text-sm uppercase tracking-wide">Z. Axl&apos;s Dig Yard</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-nav-text p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden mt-2 bg-white rounded-3xl shadow-card-hover overflow-hidden border border-light-gray"
          >
            <div className="px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-3 font-quicksand font-bold text-sm uppercase text-nav-text border-b border-light-gray/50 hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="pl-4 py-1 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 font-quicksand text-xs font-semibold text-dusk-soft hover:text-forest"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href={user ? "/portal" : "/login"}
                  className="block text-center font-quicksand font-bold text-sm uppercase text-white bg-nav-text px-5 py-3 rounded-pill hover:opacity-80 transition-opacity"
                >
                  {user ? "My Portal" : "Membership Portal"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
