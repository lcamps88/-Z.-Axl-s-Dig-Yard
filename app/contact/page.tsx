import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { MapPin, Clock, Mail, Instagram, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Z. Axl's Dig Yard — general questions, party inquiries, and more.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string; type?: string }>;
}) {
  const { event, type } = await searchParams;
  const defaultInquiryType = type ?? (event ? "Special Events" : "");
  const defaultMessage = event ? `I'd like to register for: ${decodeURIComponent(event)}` : "";

  return (
    <>
      <PageHero
        tag="Contact Us"
        title="We'd love to hear from you."
        subtitle="Whether you have a question about memberships, want to book a party, or just want to say hello — we're here."
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection direction="left">
              <p className="label-tag mb-6">Send a Message</p>
              <ContactForm defaultInquiryType={defaultInquiryType} defaultMessage={defaultMessage} />
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection direction="right" delay={0.15}>
              <p className="label-tag mb-6">Find Us</p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-earth" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal mb-1">
                      Location
                    </h3>
                    <p className="font-body text-sm text-warm-gray">
                      Bethel, CT
                      <br />
                      (Address shared upon booking)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-earth" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal mb-1">
                      Hours
                    </h3>
                    <p className="font-body text-sm text-warm-gray">
                      Session-based scheduling
                      <br />
                      Appointments strongly encouraged
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-earth" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@zaxlsdigyard.com"
                      className="font-body text-sm text-earth hover:underline"
                    >
                      hello@zaxlsdigyard.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sand-light flex items-center justify-center shrink-0">
                    <Instagram size={18} className="text-earth" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal mb-1">
                      Social Media
                    </h3>
                    <div className="flex gap-4">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-earth hover:underline flex items-center gap-1.5"
                      >
                        <Instagram size={14} /> Instagram
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-earth hover:underline flex items-center gap-1.5"
                      >
                        <Facebook size={14} /> Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-cream-dark p-8">
                <p className="font-display text-lg font-light text-charcoal mb-3">
                  Interested in a birthday party?
                </p>
                <p className="font-body text-sm text-warm-gray leading-relaxed mb-4">
                  Use the contact form and select &ldquo;Birthday Party Inquiry&rdquo; so we
                  can route your message to our celebrations team.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
