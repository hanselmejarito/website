"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <p className="border border-white/20 px-4 py-4 text-sm text-canvas-white/80">
        You&apos;re on the list. See you on the next drop.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full border border-white/20 bg-transparent px-4 py-3.5 text-sm text-canvas-white placeholder:text-canvas-white/40 focus:border-signal focus:outline-none"
        />
        <Button type="submit" variant="onDark" className="shrink-0 !px-6 !py-3.5">
          Join
        </Button>
      </div>
    </form>
  );
}
