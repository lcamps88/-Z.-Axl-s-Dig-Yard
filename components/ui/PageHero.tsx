"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  tag?: string;
  title: string;
  scriptWord?: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dark";
}

export default function PageHero({
  tag,
  title,
  scriptWord,
  subtitle,
  className,
  center = true,
  size = "md",
  variant = "default",
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "pt-36 pb-20 px-6 md:px-12 relative overflow-hidden",
        isDark
          ? "bg-gradient-to-br from-dusk to-forest"
          : "bg-sky-mist",
        className
      )}
    >
      {isDark && (
        <div className="absolute inset-0 opacity-10 dotted-bg pointer-events-none" />
      )}
      <div className={cn("relative z-10 max-w-4xl", center && "mx-auto text-center")}>
        {tag && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "label-tag mb-4",
              isDark && "text-gold"
            )}
          >
            {tag}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "font-display font-bold leading-tight",
            isDark ? "text-white" : "text-dusk",
            size === "lg" && "text-5xl md:text-6xl lg:text-7xl",
            size === "md" && "text-4xl md:text-5xl lg:text-6xl",
            size === "sm" && "text-3xl md:text-4xl"
          )}
        >
          {scriptWord ? (
            <>
              <span className="font-script text-gold">{scriptWord}</span>{" "}
              {title}
            </>
          ) : (
            title
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "mt-6 font-body leading-relaxed",
              isDark ? "text-white/80" : "text-dusk-soft",
              size === "lg" ? "text-xl" : "text-lg",
              center && "max-w-2xl mx-auto"
            )}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Wave bottom */}
      {!isDark && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-8">
            <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,10 1440,20 L1440,40 L0,40 Z" fill="#F0F5F9" />
          </svg>
        </div>
      )}
    </section>
  );
}
