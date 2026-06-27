import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Born from a personal search for connection. The heart of Z. Axl's Dig Yard and the story behind our founder's mission.",
};

export default function OurMissionPage() {
  return (
    <>
      <PageHero
        tag="Our Mission"
        title="Born from a personal search for connection."
        subtitle="Named in honor of Axl and inspired by the resilience of siblings like Zoey."
      />

      {/* Founder Story */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-tag mb-6">The Heart Behind the Yard</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="prose-dig space-y-6">
              <p className="font-body text-lg text-warm-gray leading-relaxed">
                The heart of Z. Axl&apos;s Dig Yard was born from a personal search for
                connection. After the loss of her son, Axl, our founder searched for a space
                where she could simply be with her daughter, Zoey — a place that wasn&apos;t
                loud, chaotic, or overwhelming, but instead offered a sense of calm and a way
                to navigate their &ldquo;big feelings&rdquo; together.
              </p>
              <p className="font-body text-lg text-warm-gray leading-relaxed">
                When she couldn&apos;t find that &ldquo;third space&rdquo; in our community,
                she decided to create it.
              </p>
              <blockquote className="border-l-4 border-sand pl-8 my-10">
                <p className="font-display text-2xl font-light text-charcoal italic leading-relaxed">
                  &ldquo;Named in honor of Axl and inspired by the resilience of siblings
                  like Zoey, Z. Axl&apos;s Dig Yard is more than a business — it is a
                  sanctuary for families to find their own rhythm, regulate their energy,
                  and build lasting blueprints of connection.&rdquo;
                </p>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream-dark">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">Our Values</p>
            <h2 className="heading-section mb-12 max-w-xl">
              The principles that guide every decision we make.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Connection Over Distraction",
                body: "Every design choice, from our curated palette to our strict guest count, prioritizes genuine connection between caregiver and child over entertainment for entertainment&apos;s sake.",
              },
              {
                title: "Science-Backed, Heart-Led",
                body: "We believe that being neuro-aware and emotionally intentional doesn&apos;t require a clinical setting. Our environment brings the research to life in a warm, accessible way.",
              },
              {
                title: "Caregiver as Co-Regulator",
                body: "You are not a bystander here. We are a caregiver-inclusive facility because we believe the most important structure being built is the relationship between you and your child.",
              },
              {
                title: "Safety Through Design",
                body: "Our trauma-informed design principles ensure that every child — and every caregiver — feels psychologically safe the moment they walk through our door.",
              },
            ].map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="card-soft h-full">
                  <div className="divider" />
                  <h3 className="font-display text-xl font-medium text-charcoal mb-3">
                    {value.title}
                  </h3>
                  <p
                    className="font-body text-warm-gray text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: value.body }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trauma-Informed Design */}
      <section className="section-padding bg-charcoal text-cream">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4 text-sand">Trauma-Informed Design</p>
            <h2 className="heading-section text-cream mb-6 max-w-2xl">
              Our &ldquo;museum-calm&rdquo; aesthetic is a commitment to psychological
              safety.
            </h2>
            <div className="w-16 h-px bg-sand mb-12" />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Intentional Sightlines",
                body: "Our layout features clear, open sightlines. Children can explore independently while maintaining a visual &ldquo;anchor&rdquo; to their caregiver, reducing anxiety and promoting confident play.",
              },
              {
                title: "A Soothing Palette",
                body: "We&apos;ve traded primary-colored chaos for a curated palette of soft tones. This reduces visual noise and sensory overstimulation throughout the facility.",
              },
              {
                title: "Regulated Energy",
                body: "We maintain a strict guest count and use grounding materials to ensure the environment remains regulated rather than overwhelming — for children and caregivers alike.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.12}>
                <div className="border border-white/10 p-8 h-full">
                  <h3 className="font-display text-xl font-medium text-cream mb-3">
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-sm text-cream/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
