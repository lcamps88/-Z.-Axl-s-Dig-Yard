"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const INQUIRY_TYPES = [
  "General Question", "Membership Inquiry", "Birthday Party Inquiry",
  "Special Events", "Private Hire", "Other",
];

const inputClass = "w-full border-2 border-light-gray rounded-2xl px-5 py-3 font-body text-sm text-dusk placeholder:text-mid-gray focus:outline-none focus:border-forest transition-colors bg-white";
const labelClass = "block font-body font-bold text-xs text-dusk mb-1.5 uppercase tracking-wider";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSubmitted(true); toast.success("Message sent!"); }
      else toast.error("Something went wrong. Please try again.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-forest-light border-2 border-forest/20 rounded-3xl p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <p className="font-display font-bold text-2xl text-dusk mb-3">Message received!</p>
        <p className="font-body text-sm text-dusk-soft">We'll be in touch within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name *</label>
          <input id="firstName" name="firstName" type="text" required className={inputClass} placeholder="Jane" />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name *</label>
          <input id="lastName" name="lastName" type="text" required className={inputClass} placeholder="Smith" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Email Address *</label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@example.com" />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>Phone Number</label>
        <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(203) 555-0100" />
      </div>
      <div>
        <label htmlFor="inquiryType" className={labelClass}>Inquiry Type *</label>
        <select id="inquiryType" name="inquiryType" required className={inputClass}>
          <option value="">Select a topic…</option>
          {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="childAges" className={labelClass}>Child&apos;s Age(s)</label>
        <input id="childAges" name="childAges" type="text" className={inputClass} placeholder="e.g. 2 years, 5 years" />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea id="message" name="message" required rows={5} className={inputClass + " resize-none"} placeholder="Tell us about your family and how we can help…" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base gap-2 disabled:opacity-60">
        {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : "Send Message 🌱"}
      </button>
    </form>
  );
}
