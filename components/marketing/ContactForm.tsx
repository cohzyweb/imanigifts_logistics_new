"use client";

import { useState, type FormEvent } from "react";
import type { ContactMessage } from "@/types";
import { STORAGE_KEYS, load, makeId, save } from "@/lib/storage";
import Icon from "@/components/shared/Icon";
import { inputCls, labelCls } from "@/components/shared/FormControls";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "general",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address";
    if (form.message.trim().length < 10)
      next.message = "Please tell us a little more (10+ characters)";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const messages = load<ContactMessage[]>(STORAGE_KEYS.messages, []);
    save(STORAGE_KEYS.messages, [
      { id: makeId("msg"), ...form, createdAt: new Date().toISOString() },
      ...messages,
    ]);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-primary text-on-primary rounded-xl p-10 text-center">
        <div className="w-16 h-16 bg-on-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="check_circle" className="text-3xl" fill />
        </div>
        <h3 className="font-headline text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-accent/80 mb-6">
          Thank you, {form.name}. We&apos;ll be in touch at {form.email} within
          24 hours.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-2.5 bg-on-primary/10 border border-on-primary/20 rounded-lg font-bold text-sm hover:bg-on-primary/20 transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            Full Name
          </label>
          <input
            id="contact-name"
            className={inputCls}
            placeholder="Jane Doe"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
          {errors.name && (
            <p className="text-xs text-error mt-1.5 font-medium">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            className={inputCls}
            placeholder="jane@company.com"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-error mt-1.5 font-medium">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className={labelCls}>
            Phone (optional)
          </label>
          <input
            id="contact-phone"
            className={inputCls}
            placeholder="+1 555 000 0000"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className={labelCls}>
            Subject
          </label>
          <select
            id="contact-subject"
            className={inputCls}
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
          >
            <option value="general">General Enquiry</option>
            <option value="quote">Request a Quote</option>
            <option value="shipment">Shipment Issue</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="contact-message"
          className={`${inputCls} resize-none`}
          rows={5}
          placeholder="Tell us how we can help you..."
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
        />
        {errors.message && (
          <p className="text-xs text-error mt-1.5 font-medium">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-4 text-white font-bold rounded-lg text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 sig-gradient"
      >
        <Icon name="send" className="text-base" />
        Send Message
      </button>
    </form>
  );
}
