import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Member Login",
  description: "Log in to your Z. Axl's Dig Yard member portal.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream-dark flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-light text-charcoal mb-2">
            Member Login
          </h1>
          <p className="font-display text-lg font-light text-charcoal italic mb-1">
            Z. Axl&apos;s Dig Yard
          </p>
          <div className="w-12 h-px bg-sand mx-auto mt-4" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
