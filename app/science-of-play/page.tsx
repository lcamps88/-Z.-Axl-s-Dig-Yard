import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Science of Play",
  description:
    "Why play is a child's most important job. Rooted in the CASEL framework, our approach to emotional literacy and social-emotional learning.",
};

const PILLARS = [
  {
    title: "Self-Awareness",
    body: "A child's growing ability to recognize their own physical sensations and 'big emotions' in the moment, transforming impulsive behaviors into a foundational blueprint for lifelong mental health and resilience.",
    color: "bg-sand-light",
    accent: "text-earth",
  },
  {
    title: "Self-Management",
    body: "A child's ability to navigate 'big emotions' and physical impulses in real-time, allowing them to shift from reactive behaviors to intentional actions that support their own regulation and the safety of others.",
    color: "bg-sage-light/50",
    accent: "text-sage",
  },
  {
    title: "Social Awareness",
    body: "A child's growing ability to recognize and empathize with the emotions of others, allowing them to adjust their own behavior to support the needs, safety, and perspective of others.",
    color: "bg-dusty-blue/20",
    accent: "text-dusty-blue",
  },
  {
    title: "Relationship Skills",
    body: "A child's growing ability to communicate clearly, collaborate on shared 'projects,' and navigate conflict with empathy. This builds the foundational blueprints for healthy, lasting connections with others.",
    color: "bg-cream-dark",
    accent: "text-warm-gray",
  },
];

const RESEARCH = [
  {
    title: "The Power of Play",
    body: "Play is significantly associated with a child's psychosocial problems (internalizing and externalizing difficulties) and prosocial behavior. Executive functioning during play is a decisive factor in managing these difficulties.",
  },
  {
    title: "Play Performance & Psychosocial Problems",
    body: "Research demonstrates that play performance is directly linked to executive function development, which in turn mediates social-emotional outcomes in school-aged children.",
  },
  {
    title: "Play-Based Case Analysis",
    body: "Play-based learning for children promotes the development of social language, persistence, and cognitive flexibility — traits that foster positive coping strategies and self-regulation skills.",
  },
];

export default function ScienceOfPlayPage() {
  return (
    <>
      <PageHero
        tag="The Science of Play"
        title="Play is a child's most important job."
        subtitle="While it looks like simple fun, there is a deep, intentional science happening beneath the surface. Our environment is designed around the CASEL framework — the gold standard for Social and Emotional Learning."
      />

      {/* Why It Matters */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-tag mb-6">Why It Matters</p>
            <h2 className="heading-section mb-8">
              Young children do not &ldquo;speak&rdquo; their emotions — they{" "}
              <em className="not-italic text-earth">show</em> them.
            </h2>
          </AnimatedSection>
          <div className="space-y-5">
            {[
              "For a child between 18 months and 7 years old, the prefrontal cortex — the part of the brain responsible for logical reasoning and verbalizing complex feelings — is still 'under construction.' When a child is overwhelmed, frustrated, or overstimulated, they don't yet have the vocabulary to say 'I'm feeling anxious because this environment is too loud.' Instead, they speak through their bodies.",
              "Whether it is a sudden meltdown, a refusal to share, or a period of intense, focused digging, behavior is a child's primary language. Understanding this 'silent language' isn't just about making a playdate easier; it is about protecting long-term mental health.",
              "Clinical research consistently shows a direct link between how we support emotional dysregulation in early childhood and mental health outcomes later in life. We believe that every 'meltdown' is simply a missed connection.",
              "Our 5,000-square-foot facility is 'Imagineered' to support our 'Site Supervisors' (parents and caregivers) in translating these non-verbal cues into moments of growth — providing a sanctuary where your child's emotional development is the primary build.",
            ].map((para, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <p className="font-body text-lg text-warm-gray leading-relaxed">{para}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CASEL Pillars */}
      <section className="section-padding bg-cream-dark">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">The Foundations of Emotional Literacy</p>
            <h2 className="heading-section mb-4 max-w-2xl">
              Emotional literacy is the ability to identify, understand, and express feelings
              in a healthy way.
            </h2>
            <p className="body-lead mb-12 max-w-2xl">
              In our &ldquo;Dig Yard,&rdquo; we focus on four key pillars of the CASEL
              framework — translated into a boutique, non-clinical experience.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.12}>
                <div className={`${pillar.color} p-10 h-full`}>
                  <p className={`label-tag mb-3 ${pillar.accent}`}>{pillar.title}</p>
                  <p className="font-body text-warm-gray text-sm leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4 text-sand">Research & Science</p>
            <h2 className="heading-section text-cream mb-12 max-w-2xl">
              Our approach is grounded in peer-reviewed research.
            </h2>
          </AnimatedSection>

          <div className="space-y-6">
            {RESEARCH.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="border-t border-white/10 pt-6 grid md:grid-cols-4 gap-4">
                  <h3 className="font-display text-lg font-medium text-cream md:col-span-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-cream/60 leading-relaxed md:col-span-3">
                    {item.body}
                  </p>
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
            <h2 className="heading-section mb-6">
              See these principles in action.
            </h2>
            <p className="body-lead mb-8">
              Visit our Yard and experience how an intentionally designed environment changes
              everything about play.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/the-yard" className="btn-primary">
                Explore The Yard
              </Link>
              <Link href="/plan-your-visit" className="btn-secondary">
                Plan Your Visit
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
