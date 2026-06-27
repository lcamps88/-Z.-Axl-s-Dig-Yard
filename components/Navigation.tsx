"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const NAV_ITEMS = [
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

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white shadow-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 bg-gold rounded-full flex items-center justify-center shrink-0 shadow-soft group-hover:scale-105 transition-transform">
              {/* Excavator icon */}
              <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                <rect x="4" y="20" width="20" height="8" rx="2" fill="#1E2D40"/>
                <rect x="6" y="22" width="6" height="4" rx="1" fill="#F0F5F9"/>
                <rect x="22" y="18" width="10" height="4" rx="1" fill="#1E2D40"/>
                <rect x="8" y="14" width="14" height="8" rx="2" fill="#3A6347"/>
                <path d="M22 18 L30 12 L30 18" fill="#4A7C59"/>
                <rect x="4" y="28" width="28" height="3" rx="1.5" fill="#1E2D40"/>
                <circle cx="8" cy="30" r="2.5" fill="#3A6347"/>
                <circle cx="24" cy="30" r="2.5" fill="#3A6347"/>
              </svg>
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-sm text-dusk leading-tight">
                Z. Axl&apos;s
              </div>
              <div className="font-body text-[10px] font-bold tracking-widest uppercase text-forest">
                Dig Yard
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-[13px] font-body font-semibold text-dusk-soft hover:text-forest transition-colors rounded-lg hover:bg-forest-light",
                      pathname.startsWith(item.href) && "text-forest"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={cn(
                        "transition-transform duration-200 text-forest",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-card-hover py-2 border border-light-gray"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-[13px] font-body font-semibold text-dusk-soft hover:text-forest hover:bg-forest-light transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-[13px] font-body font-semibold text-dusk-soft hover:text-forest transition-colors rounded-lg hover:bg-forest-light",
                    pathname === item.href && "text-forest"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Portal Button */}
            <div className="ml-3">
              {user ? (
                <Link href="/portal" className="btn-primary text-[13px] px-5 py-2.5">
                  My Portal
                </Link>
              ) : (
                <Link href="/login" className="btn-primary text-[13px] px-5 py-2.5">
                  Membership Portal
                </Link>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-dusk rounded-lg hover:bg-forest-light transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-light-gray overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-3 text-sm font-body font-bold text-dusk border-b border-light-gray/50 hover:text-forest transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 py-1 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-xs font-body font-semibold text-dusk-soft hover:text-forest"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link href={user ? "/portal" : "/login"} className="btn-primary w-full text-center block">
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
