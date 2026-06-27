import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero tag="Legal" title="Privacy Policy" size="sm" />
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection>
            <div className="prose-dig space-y-6">
              <p className="font-body text-xs text-warm-gray">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <h2>Information We Collect</h2>
              <p>
                We collect information you provide directly to us — such as your name, email
                address, phone number, and child&apos;s age — when you create an account,
                purchase a membership, book a session or party, or contact us.
              </p>
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to process transactions, send booking
                confirmations, provide customer support, send you updates about our
                programming, and improve our services.
              </p>
              <h2>Sharing of Information</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may
                share your information with service providers (such as Stripe for payment
                processing) who assist us in operating our website and services.
              </p>
              <h2>Data Security</h2>
              <p>
                We take reasonable measures to help protect your personal information from
                loss, theft, misuse, and unauthorized access. Payment information is
                processed by Stripe and never stored on our servers.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hello@zaxlsdigyard.com" className="text-earth hover:underline">
                  hello@zaxlsdigyard.com
                </a>
                .
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
