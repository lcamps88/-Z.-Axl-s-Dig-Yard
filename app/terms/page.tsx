import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHero tag="Legal" title="Terms of Service" size="sm" />
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection>
            <div className="prose-dig space-y-6">
              <p className="font-body text-xs text-warm-gray">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing or using Z. Axl&apos;s Dig Yard&apos;s website and services, you
                agree to be bound by these Terms of Service. If you do not agree to these
                terms, please do not use our services.
              </p>
              <h2>Use of Services</h2>
              <p>
                Our facility is designed for children ages 18 months through 7 years.
                Children must be accompanied by an adult caregiver at all times. By booking
                a session, you agree to abide by all facility rules and policies as outlined
                on our website.
              </p>
              <h2>Memberships & Payments</h2>
              <p>
                Memberships are billed monthly and automatically renew until cancelled.
                You may cancel your membership at any time through your member portal or
                by contacting us. Refunds are not provided for partial billing periods.
              </p>
              <h2>Birthday Parties & Events</h2>
              <p>
                Birthday party deposits are non-refundable. Event tickets are non-refundable
                unless the event is cancelled by Z. Axl&apos;s Dig Yard. All facility rules
                outlined in our Birthday FAQs are part of these Terms.
              </p>
              <h2>Liability</h2>
              <p>
                By visiting our facility, you acknowledge and accept the inherent risks
                associated with play activities. A liability waiver must be signed by the
                parent or legal guardian of each child before entering the play area.
              </p>
              <h2>Contact</h2>
              <p>
                Questions about these Terms may be directed to{" "}
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
