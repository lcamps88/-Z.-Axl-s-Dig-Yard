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
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "FAQs", href: "/faqs" },
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
      {/* Desktop pill navbar — 3-col grid so logo is always centered */}
      <nav
        ref={dropdownRef}
        className="hidden lg:grid items-center max-w-[1400px] mx-auto bg-nav-gold px-8 py-2"
        style={{ borderRadius: "8.75rem", overflow: "visible", gridTemplateColumns: "1fr auto 1fr" }}
      >
        {/* Left nav items — right-aligned so they push toward center */}
        <div className="flex items-center justify-end gap-3">
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

        {/* Center logo — always at true center */}
        <Link href="/" className="flex-shrink-0 mx-4">
          <div
            className="flex items-center justify-center bg-white rounded-full shadow-soft border-4 border-white"
            style={{ width: "5.5rem", height: "5.5rem", marginTop: "-1.25rem", marginBottom: "-1.25rem" }}
          >
            <Image src={Logo} alt="Z. Axl's Dig Yard Logo" width={88} height={88} className="w-full h-full object-contain rounded-full" />
          </div>
        </Link>

        {/* Right nav items — left-aligned so they push toward center */}
        <div className="flex items-center justify-start gap-3">
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
            className="ml-2 font-quicksand font-bold text-sm uppercase text-white bg-white px-5 py-2.5 whitespace-nowrap hover:opacity-80 transition-opacity"
            style={{ borderRadius: "8.75rem" }}
          >
            <span className="font-quicksand font-bold text-sm uppercase text-nav-text bg-white px-5 py-2.5 whitespace-nowrap hover:opacity-80 transition-opacity">
              {user ? "My Portal" : "Membership Portal"}
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile bar */}
      <div
        className="lg:hidden flex items-center justify-between bg-nav-gold pl-2 pr-5 py-2"
        style={{ borderRadius: "8.75rem" }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-white rounded-full border-2 border-white">
            <Image src={Logo} alt="Z. Axl's Dig Yard Logo" width={54} height={54} className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="font-quicksand font-bold text-nav-text text-xs uppercase tracking-wide">Z. Axl&apos;s Dig Yard</span>
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
