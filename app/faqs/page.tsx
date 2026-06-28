"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "all", label: "All FAQs" },
  { value: "general", label: "General" },
  { value: "visit", label: "Plan Your Visit" },
  { value: "memberships", label: "Memberships" },
  { value: "birthdays", label: "Birthday Parties" },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-light-gray">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-5 gap-4"
      >
        <span className="font-quicksand font-bold text-dusk text-base">{q}</span>
        <ChevronDown size={18} className={cn("shrink-0 text-forest transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="font-body text-dusk-soft text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [active, setActive] = useState("all");

  useEffect(() => {
    fetch("/api/faqs").then((r) => r.json()).then(setFaqs);
  }, []);

  const filtered = active === "all" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <>
      <PageHero
        tag="FAQs"
        title="Questions we love to answer."
        subtitle="Everything you need to know before your first visit, birthday booking, or membership."
      />

      <section className="section-padding bg-mist">
        <div className="max-w-3xl mx-auto">
          {/* Category tabs */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActive(cat.value)}
                  className={cn(
                    "font-quicksand font-bold text-sm px-5 py-2 rounded-pill transition-all",
                    active === cat.value
                      ? "bg-forest text-white shadow-soft"
                      : "bg-white text-dusk-soft border border-light-gray hover:border-forest hover:text-forest"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="bg-white rounded-3xl px-8 py-4 shadow-card">
              {filtered.length === 0 ? (
                <p className="text-center py-10 font-quicksand text-dusk-soft">Loading…</p>
              ) : (
                filtered.map((faq) => (
                  <AccordionItem key={faq._id} q={faq.question} a={faq.answer} />
                ))
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
