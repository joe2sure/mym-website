"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900);
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="font-display text-lg text-[var(--paper-text)]">You&apos;re on the list.</p>
        <p className="mt-2 text-[0.85rem] text-[var(--muted-on-ink)]">
          We&apos;ll email {email} when Meet Your Match opens in your city. No spam, just launch news.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-[var(--paper-text)] placeholder:text-white/35 focus:border-[var(--flame)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-full bg-[var(--flame)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--flame-dim)] disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </button>
    </form>
  );
}

function InvestorForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900);
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[var(--paper-line)] bg-white/60 p-6">
        <p className="font-display text-lg text-[var(--ink-text)]">Thanks, {name}.</p>
        <p className="mt-2 text-[0.85rem] text-[var(--muted-on-paper)]">
          The deck and data room link are on their way to your inbox within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name & fund"
        className="w-full rounded-full border border-[var(--paper-line)] bg-white/70 px-5 py-3.5 text-sm text-[var(--ink-text)] placeholder:text-[var(--muted-on-paper)] focus:border-[var(--flame-dim)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-semibold text-[var(--paper-text)] transition-colors hover:bg-black disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request the deck"}
      </button>
    </form>
  );
}

export function CTA() {
  return (
    <>
      <section id="waitlist" className="grain bg-[var(--ink)] py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label text-[var(--ember)] mb-5">Get early access</p>
          <h2 className="font-display text-balance text-3xl leading-tight text-[var(--paper-text)] sm:text-4xl">
            The next batch of members shapes who&apos;s in the room after that.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--muted-on-ink)]">
            Join the waitlist and we&apos;ll let you know the moment Meet Your Match opens
            in your city.
          </p>
          <div className="mx-auto mt-9 max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <section id="investors" className="bg-[var(--paper-soft)] py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label text-[var(--flame-dim)] mb-5">For investors</p>
          <h2 className="font-display text-balance text-3xl leading-tight text-[var(--ink-text)] sm:text-4xl">
            We&apos;re raising to take Meet Your Match from six metros to sixty.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--muted-on-paper)]">
            Leave your name and fund and we&apos;ll send the full deck, data room access,
            and a time to talk.
          </p>
          <div className="mx-auto mt-9 max-w-md">
            <InvestorForm />
          </div>
        </div>
      </section>
    </>
  );
}
