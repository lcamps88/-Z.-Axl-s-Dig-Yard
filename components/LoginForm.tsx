"use client";

import { useState } from "react";
import { Loader2, Mail, Info } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

// Set to true once Google OAuth is configured in Supabase dashboard
const GOOGLE_OAUTH_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true";

export default function LoginForm() {
  const [tab, setTab] = useState<"magic" | "google">("magic");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      setSent(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    if (!GOOGLE_OAUTH_ENABLED) {
      toast.error("Google login coming soon — use Magic Link for now!");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-forest-light border border-forest/20 rounded-3xl p-10 text-center">
        <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail size={28} className="text-white" />
        </div>
        <h2 className="font-display font-bold text-2xl text-dusk mb-3">Check your email!</h2>
        <p className="font-body text-sm text-dusk-soft leading-relaxed">
          We sent a magic link to{" "}
          <strong className="font-bold text-dusk">{email}</strong>.
          <br />Click the link in your email to sign in.
        </p>
        <p className="font-body text-xs text-mid-gray mt-3">
          Don&apos;t see it? Check your spam folder.
        </p>
        <button
          onClick={() => { setSent(false); setEmail(""); }}
          className="mt-6 font-body text-xs text-dusk-soft hover:text-dusk underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-card">
      {/* Tabs */}
      <div className="flex gap-2 bg-mist rounded-pill p-1 mb-8">
        {([
          { id: "magic" as const, label: "✉️ Magic Link" },
          { id: "google" as const, label: "🔵 Google" },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 rounded-pill font-body font-bold text-sm transition-all ${
              tab === t.id
                ? "bg-forest text-white shadow-soft"
                : "text-dusk-soft hover:text-dusk"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "magic" ? (
        <form onSubmit={handleMagicLink} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-body font-bold text-xs text-dusk mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-light-gray rounded-2xl px-5 py-3 font-body text-sm text-dusk placeholder:text-mid-gray focus:outline-none focus:border-forest transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 gap-2 text-base disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
            {loading ? "Sending…" : "Send Magic Link"}
          </button>
          <p className="font-body text-xs text-mid-gray text-center">
            No password needed — we email you a secure sign-in link.
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border-2 border-light-gray rounded-2xl py-3.5 font-body font-bold text-sm text-dusk hover:border-forest hover:bg-forest-light transition-all disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </button>

          {!GOOGLE_OAUTH_ENABLED && (
            <div className="flex items-start gap-2 bg-gold-light border border-gold/30 rounded-2xl px-4 py-3">
              <Info size={14} className="text-gold-dark mt-0.5 shrink-0" />
              <p className="font-body text-xs text-dusk-soft leading-relaxed">
                Google login is coming soon. Please use{" "}
                <button onClick={() => setTab("magic")} className="font-bold text-forest underline">
                  Magic Link
                </button>{" "}
                to sign in for now.
              </p>
            </div>
          )}

          <p className="font-body text-xs text-mid-gray text-center">
            Sign in with your Google account for quick access.
          </p>
        </div>
      )}

      <p className="mt-8 font-body text-xs text-mid-gray text-center">
        Not a member yet?{" "}
        <a href="/play-options" className="text-forest font-bold hover:underline">
          View membership options →
        </a>
      </p>
    </div>
  );
}
