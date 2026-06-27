"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FAQ_SECTIONS = [
  {
    category: "Arrival & Timing",
    faqs: [
      {
        q: "When should we arrive?",
        a: "Please arrive no more than 15 minutes prior to your scheduled party time. This will allow us to start on schedule and maximize your guided play time.",
      },
      {
        q: "Can we make changes on the day of the party?",
        a: "All party details will be discussed in advance and confirmed the day before your event. To maintain high standards and operational excellence, we will not be able to accommodate changes on the day of the party.",
      },
      {
        q: "What is the check-in process for guests?",
        a: "All party guests must be checked in by a parent or legal guardian before entering the play area. Waivers must be signed individually by the parent/guardian of each child and cannot be signed by the party host.",
      },
    ],
  },
  {
    category: "Food & Cake",
    faqs: [
      {
        q: "Are there any food restrictions?",
        a: "Yes — we are a strictly nut-free facility. The party host is responsible for ensuring that all food products brought into the facility comply with this nut-free policy.",
      },
      {
        q: "Do you provide candles for the cake?",
        a: "We do not provide candles unless they are specifically included as part of your booked party package.",
      },
      {
        q: "Can we have food in the sandbox?",
        a: "For hygiene and cleanliness standards, absolutely no food or beverages (for adults or children) are permitted inside the sandbox. This is a non-negotiable part of our standard operating guidelines.",
      },
      {
        q: "Can we bring our own food or cater?",
        a: "Any outside food or catering brought in must be managed and served by the party host. This includes cupcakes and cakes. Anyone serving food in the facility (including the party host or their helpers) must wear disposable gloves, which we will provide.",
      },
      {
        q: "Do children need to wash their hands before eating?",
        a: "Yes — all children will be asked to wash their hands thoroughly before consuming any food.",
      },
    ],
  },
  {
    category: "Decorations & Supplies",
    faqs: [
      {
        q: "What paper products are provided?",
        a: "We will provide construction-themed paper products (plates, napkins, cups) for all party packages. Families are welcome to bring additional decorations to personalize their party space.",
      },
      {
        q: "What decorations are NOT permitted?",
        a: "No confetti, glitter, streamers, piñatas, or balloons filled with confetti/glitter are permitted in the facility. These items are difficult to clean and can compromise the play environment.",
      },
      {
        q: "How can we hang decorations?",
        a: "To protect our walls and surfaces, please use only painter's tape or removable mounting putty to hang decorations. No tacks, nails, staples, or strong adhesive tapes are allowed.",
      },
      {
        q: "Are regular balloons allowed?",
        a: "Standard balloons (non-confetti/non-glitter filled) are permitted, but they must be kept contained within the party room area.",
      },
      {
        q: "Who is responsible for setup and cleanup?",
        a: "The party host is responsible for setting up any outside decorations and ensuring all decorations are removed completely at the end of the party time.",
      },
    ],
  },
  {
    category: "Play & Activities",
    faqs: [
      {
        q: "Are activities guided?",
        a: "Yes — all play activities will be guided by our Dig Yard facilitators. For the safety of all guests, children must always follow facilitator instructions.",
      },
      {
        q: "What are the sock requirements?",
        a: "For hygiene and safety, children must wear provided Dig Socks during play. Shoes are strictly not permitted in the sandbox or play areas under any circumstances.",
      },
      {
        q: "Can guests bring toys from home?",
        a: "To maintain the cleanliness and safety of our equipment, only items provided by our facility are allowed inside the sandbox. Please ensure nothing from outside (including toys, personal items, food, or accessories) enters the sand.",
      },
    ],
  },
  {
    category: "Safety & Supervision",
    faqs: [
      {
        q: "How many children does the base package cover?",
        a: "Our parties are priced for 10 children. Per Connecticut state guidelines, maintaining appropriate adult-to-child ratios beyond this capacity requires a second Dig Yard Facilitator. We can accommodate additional children for a supplementary fee per child, which includes the cost of the mandated second facilitator.",
      },
      {
        q: "Are your staff first-aid certified?",
        a: "Yes — all our staff facilitators are certified in both adult and pediatric CPR and basic first aid. First aid supplies are available on-site for minor scrapes or bumps.",
      },
      {
        q: "Who is responsible for guest behavior?",
        a: "The party host is responsible for the behavior of their guests and the children under their supervision. Any damage to the facility or equipment caused intentionally or due to negligence by a party guest will be the financial responsibility of the party host.",
      },
      {
        q: "What is your policy on lost items?",
        a: "We are not responsible for personal belongings left behind, lost, or damaged during the party. Please keep valuables secured.",
      },
      {
        q: "Does a designated adult need to stay with the group?",
        a: "Yes — we require that at least one designated adult from the hosting party remain present with the entire group of children at all times, ensuring they follow the facilitator's instructions and facility rules.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-light-gray">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-body text-sm font-medium text-charcoal leading-relaxed pr-4">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-earth shrink-0 mt-0.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-warm-gray leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BirthdayFAQsPage() {
  return (
    <>
      <PageHero
        tag="Birthday FAQs"
        title="Everything you need to know before the big day."
        subtitle="We pride ourselves on operational excellence. All questions are answered in advance so the day of your party is stress-free."
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection>
                <div className="sticky top-28 space-y-2">
                  <p className="label-tag mb-4">Jump to section</p>
                  {FAQ_SECTIONS.map((section) => (
                    <a
                      key={section.category}
                      href={`#${section.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
                      className="block font-body text-sm text-warm-gray hover:text-charcoal transition-colors py-1"
                    >
                      {section.category}
                    </a>
                  ))}
                  <div className="pt-6 border-t border-light-gray mt-6">
                    <p className="font-body text-xs text-warm-gray mb-4">
                      Still have questions?
                    </p>
                    <Link href="/contact" className="btn-primary text-xs px-5 py-2">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-2 space-y-12">
              {FAQ_SECTIONS.map((section, i) => (
                <AnimatedSection
                  key={section.category}
                  delay={i * 0.05}
                  id={section.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}
                  className="scroll-mt-28"
                >
                  <h2 className="font-display text-2xl font-light text-charcoal mb-6">
                    {section.category}
                  </h2>
                  <div>
                    {section.faqs.map((faq) => (
                      <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-earth text-cream">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="font-display text-2xl font-light text-cream mb-2">
                  Ready to book your party?
                </h3>
                <p className="font-body text-cream/70 text-sm">
                  Reach out and let&apos;s start planning something spectacular.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 bg-cream text-charcoal font-body font-medium text-sm hover:bg-sand-light transition-colors shrink-0"
              >
                Inquire About a Party
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
