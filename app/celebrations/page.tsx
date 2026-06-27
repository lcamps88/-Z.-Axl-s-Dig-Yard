import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Celebrations",
  description:
    "Special events, boutique birthday parties, and private hire at Z. Axl's Dig Yard in Bethel, CT.",
};

export default function CelebrationsPage() {
  return (
    <>
      <PageHero
        tag="Celebrations"
        title="When we theme, we theme spectacularly."
        subtitle="At Z. Axl's Dig Yard, we believe that celebration is its own form of sanctuary. Sometimes, the best way to connect is through the pure, unfiltered magic of a shared celebration."
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "Special Events",
                title: "Spectacular Themed Events",
                body: "Vibrant, high-energy celebrations where families gather to simply be together in a space transformed by spectacular imagination. Our founder has a deep-seated love for a well-executed theme.",
                href: "/celebrations/special-events",
                cta: "See Events",
                bg: "bg-earth text-cream",
                labelColor: "text-sand",
              },
              {
                label: "Boutique Birthdays",
                title: "Your All-Inclusive Party",
                body: "A private 90-minute party experience — complete with guided play, themed activities, and dedicated party support — making it easy for parents and unforgettable for kids. Starting at $450.",
                href: "/celebrations/birthdays",
                cta: "Book a Party",
                bg: "bg-sand-light text-charcoal",
                labelColor: "text-earth",
              },
              {
                label: "Private Hire",
                title: "Full Facility Buyout",
                body: "For groups and organizations seeking an exclusive, fully private experience in our 5,000-square-foot facility. Contact us to discuss your vision.",
                href: "/contact",
                cta: "Inquire Now",
                bg: "bg-charcoal text-cream",
                labelColor: "text-sand",
              },
            ].map((card, i) => (
              <AnimatedSection key={card.label} delay={i * 0.12}>
                <div className={`${card.bg} p-10 h-full flex flex-col`}>
                  <p className={`label-tag mb-4 ${card.labelColor}`}>{card.label}</p>
                  <h2 className="font-display text-2xl font-light mb-4">{card.title}</h2>
                  <p className="font-body text-sm leading-relaxed opacity-75 flex-1 mb-8">
                    {card.body}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 font-body text-sm font-medium hover:gap-3 transition-all"
                  >
                    {card.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Member early access */}
      <section className="py-16 px-6 md:px-12 bg-cream-dark border-t border-light-gray">
        <div className="container-wide">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="label-tag mb-3">Z. Axl&apos;s Members</p>
                <h3 className="font-display text-2xl font-light text-charcoal mb-4">
                  24-hour early access to all event bookings + 10% off every ticket.
                </h3>
                <p className="font-body text-warm-gray text-sm leading-relaxed">
                  To ensure our community has the first pick of the &ldquo;Spectacular,&rdquo;
                  Z. Axl Members receive priority access before events open to the public.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <Link href="/play-options" className="btn-primary">
                  Become a Member
                </Link>
                <Link href="/celebrations/birthday-faqs" className="btn-secondary">
                  Birthday FAQs
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
