import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why The Yard",
  description:
    "Explore the Emotion Selection Tunnel, Proprietary Cues to Connect, and the curated play sessions at Z. Axl's Dig Yard.",
};

export default function TheYardPage() {
  return (
    <>
      <PageHero
        tag="Why The Yard"
        title="Every inch is engineered with intention."
        subtitle="Our 5,000-square-foot facility is 'Imagineered' to support families in translating non-verbal cues into moments of growth — and sometimes, just moments of wonder."
      />

      {/* Emotion Selection Tunnel */}
      <section id="tunnel" className="section-padding bg-cream scroll-mt-20">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <p className="label-tag mb-4">The Emotion Selection Tunnel</p>
              <h2 className="heading-section mb-6">Your Entry Blueprint</h2>
              <div className="space-y-5 body-lead">
                <p>
                  At Z. Axl&apos;s Dig Yard, the transition from the busy outside world into
                  our sanctuary happens in the Emotion Selection Tunnel. This isn&apos;t just
                  an entrance — it&apos;s a sensory pause designed to help children and
                  caregivers &ldquo;check in&rdquo; before they &ldquo;dig in.&rdquo;
                </p>
                <p>
                  As you walk through, you&apos;ll encounter custom icons representing the
                  six primary emotions children first learn to recognize: joy, anger, fear,
                  sadness, disgust, and surprise. By identifying their &ldquo;internal
                  engine&rdquo; speed within the tunnel, we help families determine the most
                  supportive starting point for their session.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-6">
                <div className="bg-sand-light p-8">
                  <p className="label-tag mb-3 text-earth">High-Energy Emotions</p>
                  <h3 className="font-display text-xl font-medium text-charcoal mb-3">
                    The &ldquo;Heavy Dig&rdquo; Path
                  </h3>
                  <p className="font-body text-sm text-warm-gray leading-relaxed mb-4">
                    When a child identifies with high-energy feelings — Joy, Anger, or Fear —
                    their body is often seeking sensory grounding and big movement. The
                    recommendation: step out of the tunnel and head straight to our
                    1,300-square-foot indoor sandbox.
                  </p>
                  <p className="font-body text-xs text-warm-gray italic">
                    The physical resistance of digging and hauling provides the heavy work
                    (proprioceptive input) needed to channel high energy into grounded,
                    productive play.
                  </p>
                </div>

                <div className="bg-dusty-blue/20 p-8">
                  <p className="label-tag mb-3 text-dusty-blue">Low-Energy Emotions</p>
                  <h3 className="font-display text-xl font-medium text-charcoal mb-3">
                    The &ldquo;Drafting Table&rdquo; Path
                  </h3>
                  <p className="font-body text-sm text-warm-gray leading-relaxed mb-4">
                    When a child identifies with low-energy feelings — Sadness, Disgust, or
                    Surprise — their engine is running at a quieter pace, seeking reflection
                    or a &ldquo;soft landing.&rdquo; The recommendation: transition from the
                    tunnel into the Art Studio.
                  </p>
                  <p className="font-body text-xs text-warm-gray italic">
                    This &ldquo;high-calm&rdquo; sanctuary focuses on creative expression and
                    fine-motor tasks, giving the nervous system a quiet space to process
                    feelings at a slower rhythm.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Cues to Connect */}
      <section id="cues" className="section-padding bg-charcoal scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4 text-sand">Proprietary Cues to Connect</p>
            <h2 className="heading-section text-cream mb-6 max-w-2xl">
              We don&apos;t just provide the space — we provide the language.
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            <AnimatedSection delay={0.1}>
              <p className="font-body text-cream/70 leading-relaxed text-lg">
                For every emotion selected in the tunnel, Z. Axl&apos;s provides proprietary
                Connection Cues specifically for parents and caregivers.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="font-body text-cream/70 leading-relaxed text-lg">
                These are not generic suggestions — they are intentional, research-backed
                prompts and physical &ldquo;blueprints&rdquo; for co-regulation. Our cues
                give you the exact words and activities to help you stay connected and build
                your child&apos;s emotional resilience together.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why the Tunnel Matters */}
      <section id="why" className="section-padding bg-cream-dark scroll-mt-20">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <p className="label-tag mb-4">Why the Tunnel Matters</p>
            <h2 className="heading-section mb-8">
              Turning abstract emotions into a concrete plan.
            </h2>
            <p className="body-lead mb-6">
              By physically moving through the Emotion Selection Tunnel, the &ldquo;big
              feelings&rdquo; stay out in the open where they can be managed — rather than
              tucked away. It turns an abstract emotion into a concrete plan.
            </p>
            <p className="body-lead">
              This ensures that every &ldquo;build&rdquo; at Z. Axl&apos;s starts with a
              solid foundation of understanding.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Curated Play Sessions */}
      <section id="sessions" className="section-padding bg-cream scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">Curated Play Sessions</p>
            <h2 className="heading-section mb-6 max-w-2xl">
              Intentional 90-minute blocks designed to never feel crowded.
            </h2>
            <p className="body-lead max-w-2xl mb-12">
              This structure ensures the Yard never feels crowded, maintaining a regulated
              environment where every child has the &ldquo;elbow room&rdquo; they need to
              truly immerse themselves.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "The Emotion Tunnel Check-In",
                body: "Begin your visit by identifying your child's 'internal engine speed' and receiving your personalized Connection Cues.",
              },
              {
                num: "02",
                title: "Guided Play Time",
                body: "90 minutes in a regulated, intentionally designed space — sandbox, Art Studio, or whatever your child's engine calls for today.",
              },
              {
                num: "03",
                title: "Co-Regulation Together",
                body: "Use our Connection Cues to stay present and navigate whatever emotions arise — with the support of a thoughtfully designed environment.",
              },
            ].map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.12}>
                <div className="card-soft h-full">
                  <p className="font-display text-4xl font-light text-sand mb-4">{step.num}</p>
                  <h3 className="font-display text-xl font-medium text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-warm-gray leading-relaxed">{step.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Framework + Sanctuary */}
      <section id="framework" className="section-padding bg-sage/10 scroll-mt-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <p className="label-tag mb-4">A Framework, Not a Formula</p>
              <h2 className="heading-section mb-6">The right way to play is whatever feels best for your family today.</h2>
              <div className="space-y-4 body-lead">
                <p>
                  <strong className="font-medium text-charcoal">The Structured Path:</strong>{" "}
                  If your child is navigating &ldquo;big feelings,&rdquo; you can use our
                  Emotion Selection Tunnel and Proprietary Connection Cues to turn your visit
                  into a guided emotional blueprint.
                </p>
                <p>
                  <strong className="font-medium text-charcoal">The Open Path:</strong>{" "}
                  If your child just wants to feel the sand between their toes, drive a dump
                  truck, or lose themselves in a drawing — that is exactly what they should do.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection id="sanctuary" direction="right" delay={0.15} className="scroll-mt-20">
              <p className="label-tag mb-4">A Sanctuary for Every Speed</p>
              <h2 className="heading-section mb-6">Some days are for work. Some are for wonder.</h2>
              <p className="body-lead">
                Whether you are using our research-backed tools to co-regulate a tough
                afternoon or simply enjoying a quiet, high-end space to bond side-by-side,
                the 90-minute session is yours to shape.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-earth text-cream">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 className="heading-section text-cream mb-6">
              Ready to explore The Yard?
            </h2>
            <p className="font-body text-cream/70 text-lg mb-8">
              Book your first session or learn about our membership options.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/play-options" className="inline-flex items-center justify-center px-7 py-3 bg-cream text-charcoal font-body font-medium text-sm tracking-wide hover:bg-sand-light transition-colors">
                View Play Options
              </Link>
              <Link href="/plan-your-visit" className="inline-flex items-center justify-center px-7 py-3 border border-cream/40 text-cream font-body font-medium text-sm tracking-wide hover:bg-cream/10 transition-colors">
                Plan Your Visit
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
