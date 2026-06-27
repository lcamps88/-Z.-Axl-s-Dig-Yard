import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { Clock, MapPin, Shirt, Shield, Users, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Everything you need to know before visiting Z. Axl's Dig Yard in Bethel, CT — arrival, policies, what to bring, and more.",
};

export default function PlanYourVisitPage() {
  return (
    <>
      <PageHero
        tag="Plan Your Visit"
        title="Know before you go."
        subtitle="A few simple protocols ensure that every family enjoys a regulated, high-end sanctuary. Here's everything you need to know."
      />

      {/* Location & Hours */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-earth" />
                </div>
                <div>
                  <p className="label-tag mb-1">Location</p>
                  <h2 className="font-display text-2xl font-light text-charcoal">
                    Bethel, CT
                  </h2>
                </div>
              </div>
              <p className="font-body text-warm-gray text-sm leading-relaxed mb-4">
                We are located in Bethel, Connecticut. Our full address and directions will be
                shared upon booking confirmation. Appointments are strongly encouraged to
                ensure availability and to preserve our regulated environment.
              </p>
              <div className="bg-cream-dark p-6">
                <p className="font-body text-xs text-warm-gray">
                  Bethel, CT (exact address upon booking)
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-earth" />
                </div>
                <div>
                  <p className="label-tag mb-1">Hours</p>
                  <h2 className="font-display text-2xl font-light text-charcoal">
                    Session-Based Hours
                  </h2>
                </div>
              </div>
              <p className="font-body text-warm-gray text-sm leading-relaxed mb-4">
                We operate in intentional 90-minute blocks. Our schedule varies weekly — check
                the programming calendar for available session times and to book your spot.
                Appointments are highly encouraged.
              </p>
              <Link href="/programming" className="btn-primary text-sm">
                View Calendar
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Know Before You Go */}
      <section id="know-before" className="section-padding bg-cream-dark scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">Know Before You Go</p>
            <h2 className="heading-section mb-12 max-w-2xl">
              Our facility is specifically designed for early childhood.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Ages 18 Months – 7 Years",
                body: "Our play equipment and curriculum are strictly designed for children ages 18 months through 7 years. To protect the sensory experience and safety of our youngest builders, we maintain this age guideline.",
              },
              {
                icon: Users,
                title: "No Drop-Off Policy",
                body: "We are a caregiver-inclusive facility. Children must be accompanied by an adult at all times. This isn't just a rule — it's an opportunity to engage in 'The Heavy Dig' together and use our Proprietary Connection Cues.",
              },
              {
                icon: Shirt,
                title: "Socks Required",
                body: "Z. Axl's is a strictly socks-only environment for both children and adults. Children must wear Z. Axl Dig Yard grip socks. Your own socks are fine for adults — or purchase a pair at the front desk if you forget.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.12}>
                <div className="card-soft h-full">
                  <div className="w-10 h-10 bg-sand-light flex items-center justify-center mb-5">
                    <item.icon size={18} className="text-earth" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-warm-gray leading-relaxed">{item.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Arrival & Timing */}
      <section id="arrival" className="section-padding bg-cream scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">Arrival & Timing</p>
            <h2 className="heading-section mb-8 max-w-xl">Arrive ready to dig in.</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {[
              {
                title: "Please arrive on time",
                body: "Our sessions run on a set schedule to ensure smooth transitions between groups. Arriving on time maximizes your play time.",
              },
              {
                title: "Early arrival",
                body: "For birthday parties, please arrive no more than 15 minutes before your scheduled time. For general sessions, arrive at your booking time.",
              },
              {
                title: "Confirmed in advance",
                body: "We pride ourselves on operational excellence. All session details are communicated before your visit — we won't ask you to manage logistics on the day of your session.",
              },
              {
                title: "Appointments encouraged",
                body: "To maintain our regulated, low-crowd environment, appointments are highly encouraged. Walk-ins may be accommodated based on availability.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-earth shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-charcoal text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-warm-gray leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="section-padding bg-charcoal scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex items-start gap-4 mb-10">
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                <Shield size={18} className="text-sand" />
              </div>
              <div>
                <p className="label-tag mb-2 text-sand">Safety & Supervision</p>
                <h2 className="heading-section text-cream">
                  The Z. Axl&apos;s Standard.
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "All staff facilitators are certified in adult and pediatric CPR and basic first aid",
              "First aid supplies are available on-site for minor scrapes or bumps",
              "Children must always follow facilitator instructions during guided activities",
              "Only facility-provided items are permitted inside the sandbox",
              "Strict guest counts ensure a regulated, calm environment",
              "Clear sightlines throughout the facility allow confident, independent exploration",
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="flex items-start gap-3 border border-white/10 p-5">
                  <Check size={14} className="text-sand shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-cream/70 leading-relaxed">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-sand-light">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 className="heading-section mb-6">All set? Let&apos;s get you booked.</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/play-options" className="btn-primary">
                View Play Options
              </Link>
              <Link href="/contact" className="btn-secondary">
                Ask a Question
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
