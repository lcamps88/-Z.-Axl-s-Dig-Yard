"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shovel, Star } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";

/* ── Wavy SVG dividers ─────────────────────────────────────── */
function WaveDown({ fill = "#C8DFF0" }: { fill?: string }) {
  return (
    <div className="wave-top -mb-px">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}
function WaveUp({ fill = "#C8DFF0" }: { fill?: string }) {
  return (
    <div className="wave-bottom -mt-px">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14" style={{ transform: "rotate(180deg)" }}>
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

/* ── Dotted row divider ─────────────────────────────────────── */
function DottedDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-2.5 h-2.5 rounded-full bg-sky-deep/50" />
      ))}
    </div>
  );
}

/* ── Service cards data ─────────────────────────────────────── */
const SERVICES = [
  { icon: "/categories-events/open-play-sessions.svg", title: "Open Play Sessions", body: "Drop-in anytime. No schedules, just open-ended play." },
  { icon: "/categories-events/membership-plans.svg", title: "Membership Plans", body: "Regular access to the dig yard. Build your child's emotional toolkit." },
  { icon: "/categories-events/birthday-celebrations.svg", title: "Birthday Celebrations", body: "Guided gatherings and workshops designed for families who dig deep." },
  { icon: "/categories-events/special-events.svg", title: "Special Events", body: "Guided gatherings and workshops designed for families who dig deep." },
];

const BLUEPRINT_ITEMS = [
  { label: "Intentional Space", body: "From our 1,300 sq ft indoor sandbox to our sensory Art Studio, every inch supports sensory grounding and creative expression." },
  { label: "Side-By-Side Connection", body: "Our 90-minute sessions are designed for you to stay, play, and navigate 'big feelings' alongside your child." },
  { label: "Atmosphere by Design", body: "Strict guest counts, no crowds — just space to find your family's rhythm." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background photo — place your image at /public/images/hero-bg.jpg */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        {/* Gradient overlays per design spec */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.00) 47.53%)",
          }}
        />
        <div className="absolute inset-0 bg-[rgba(25,25,26,0.50)]" />
        {/* Fallback for when no image is present */}
        <div className="absolute inset-0 bg-gradient-to-br from-dusk via-dusk-soft to-forest -z-10" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-quicksand font-bold text-white text-center capitalize mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6.625rem)", lineHeight: "100%" }}
          >
            Welcome To<br />
            Z.Axl&apos;s Dig Yard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-quicksand text-white text-center mx-auto mb-10"
            style={{ fontSize: "1.125rem", fontWeight: 500, lineHeight: "1.875rem", maxWidth: "600px" }}
          >
            A place where children dig deep into their feelings and discover who
            they are. We believe big emotions deserve space to breathe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/play-options"
              className="inline-flex items-center gap-2 font-quicksand font-bold text-nav-text px-8 py-4 rounded-pill transition-opacity hover:opacity-85"
              style={{ background: "#F1C872", fontSize: "1.05rem" }}
            >
              Join Us Today <ArrowRight size={18} />
            </Link>
            <Link
              href="/our-mission"
              className="inline-flex items-center gap-2 font-quicksand font-bold text-dusk px-8 py-4 rounded-pill transition-opacity hover:opacity-85"
              style={{ background: "#C4B5ED", fontSize: "1.05rem" }}
            >
              Learn More <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Wavy bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14 md:h-20">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="#F0F5F9" />
          </svg>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────── */}
      <section className="section-padding bg-mist">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-sky-mist flex items-center justify-center">
                  <div className="text-center p-10">
                    <Shovel size={64} className="text-forest mx-auto mb-4 opacity-50" />
                    <p className="font-body text-dusk-soft text-sm">Photo coming soon</p>
                  </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-gold/30 -z-10" />
                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-forest/20 -z-10" />
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection direction="right" delay={0.15}>
              <p className="label-tag mb-3">Our Story</p>
              <h2 className="heading-section mb-4">
                Redefining Indoor Play Through Connection And{" "}
                <span className="font-script text-gold">Learning</span>
              </h2>
              <p className="body-lead mb-6">
                Most indoor play spaces are designed for distraction. Z. Axl&apos;s Dig Yard
                is a first-of-its-kind boutique destination in Bethel, CT built specifically
                for children ages 18 months to 7 years and the caregivers who lead them.
                We&apos;ve traded the loud, chaotic &ldquo;soft play&rdquo; model for a
                &ldquo;museum-calm&rdquo; environment rooted in the science of emotional literacy.
              </p>
              <Link href="/our-mission" className="btn-primary">
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Dots */}
      <div className="bg-mist py-2">
        <div className="container-wide">
          <DottedDivider />
        </div>
      </div>

      {/* ── SAFE SPACES ───────────────────────────── */}
      <section className="py-20 px-6 bg-mist text-center">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-tag mb-3">Experience</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-dusk mb-4 leading-tight">
              <span className="font-script text-gold">Safe Spaces</span> Where Feelings<br />
              Find Their Way Out
            </h2>
            <p className="body-lead max-w-xl mx-auto mb-8">
              Children need room to feel without judgment. Our sensory-rich environment lets
              them process emotions through play, sand, and creation.
            </p>
            <Link href="/the-yard" className="btn-primary">
              Learn More <ArrowRight size={16} className="ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Wave into Blueprint */}
      <WaveDown fill="#C8DFF0" />

      {/* ── BLUEPRINT FOR BETTER PLAY ─────────────── */}
      <section className="py-20 px-6 bg-sky-mist relative">
        {/* Dotted bg overlay */}
        <div className="absolute inset-0 dotted-bg opacity-30 pointer-events-none" />

        <div className="container-wide relative">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-dusk mb-2">
              The Blueprint For{" "}
              <span className="font-script text-gold">Better Play</span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {/* Blueprint cards */}
            <div className="lg:col-span-2 space-y-4">
              {BLUEPRINT_ITEMS.map((item, i) => (
                <AnimatedSection key={item.label} delay={i * 0.1}>
                  <div className="bg-forest rounded-2xl p-6 text-white">
                    <h3 className="font-display font-bold text-lg mb-2">{item.label}</h3>
                    <p className="font-body text-white/80 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Image circle */}
            <AnimatedSection direction="right" delay={0.2} className="flex items-center justify-center">
              <div className="w-full aspect-square rounded-full overflow-hidden bg-sand-warm/30 flex items-center justify-center shadow-card max-w-xs mx-auto">
                <div className="text-center">
                  <Shovel size={56} className="text-forest mx-auto mb-3 opacity-40" />
                  <p className="font-body text-sm text-dusk-soft">Photo</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Service cards */}
          <DottedDivider />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow text-center">
                  <div className="flex justify-center mb-3">
                    <Image src={s.icon} alt={s.title} width={64} height={64} />
                  </div>
                  <h3 className="font-display font-bold text-sm text-dusk mb-2">{s.title}</h3>
                  <p className="font-body text-xs text-dusk-soft leading-relaxed">{s.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA row */}
          <AnimatedSection delay={0.3} className="flex justify-center gap-4 mt-10 flex-wrap">
            <Link href="/play-options" className="btn-primary">Join Us Today</Link>
            <Link href="/our-mission" className="btn-white">Learn More</Link>
          </AnimatedSection>
        </div>
      </section>

      <WaveUp fill="#C8DFF0" />

      {/* ── TRUSTED ────────────────────────────────── */}
      <section className="py-20 px-6 bg-mist text-center">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-tag mb-2">Community</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-dusk mb-10">
              <span className="font-script text-gold">Trusted</span> By Parents And Professionals
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "This space changed how I play with my daughter. The Connection Cues are brilliant.", name: "Sarah M.", age: "Mom of 2, age 3 & 5" },
              { quote: "As an early childhood educator, I'm blown away by how the environment supports self-regulation.", name: "Dr. Priya K.", age: "Child Development Specialist" },
              { quote: "My son came in overwhelmed and left calm, connected, and asking when we can go back.", name: "Marcus T.", age: "Dad of a 4-year-old" },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card-white text-left h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => <Star key={s} size={14} className="text-gold fill-gold" />)}
                  </div>
                  <p className="font-body text-dusk-soft text-sm leading-relaxed flex-1 mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-body font-bold text-dusk text-sm">{t.name}</p>
                    <p className="font-body text-xs text-mid-gray">{t.age}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="font-body text-xs text-mid-gray mt-6 italic">
            * Testimonials are representative. As a new business, we&apos;re building our community — reviews coming soon.
          </p>
        </div>
      </section>

      {/* ── READY TO DIG IN CTA ──────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dusk to-forest" />
        <div className="absolute inset-0 opacity-10 dotted-bg" />
        <div className="relative z-10 container-narrow text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Ready To Dig In?
            </h2>
            <p className="font-body text-white/75 text-lg mb-8 max-w-md mx-auto">
              Join us before the ribbon cutting and be part of something real.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/play-options" className="btn-gold text-base px-9 py-4">
                Join Us Today
              </Link>
              <Link href="/our-mission" className="btn-outline-white text-base px-9 py-4">
                Learn More
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SOCIAL FEED ──────────────────────────────── */}
      <section className="py-16 px-6 bg-mist">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-dusk">
              Follow Us <span className="font-script text-gold">On Our Socials</span>
            </h2>
            <div className="flex justify-center gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-forest rounded-pill flex items-center justify-center text-white hover:bg-forest-dark transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-forest rounded-pill flex items-center justify-center text-white hover:bg-forest-dark transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </AnimatedSection>

          {/* Photo grid placeholder */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="aspect-square rounded-2xl bg-sky-mist flex items-center justify-center">
                  <Shovel size={24} className="text-forest opacity-30" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
