"use client";

import { useState } from "react";
import CustomerNav from "@/components/customer/CustomerNav";
import CustomerFooter from "@/components/customer/CustomerFooter";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stagger = {
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const contactInfo = [
  {
    icon: "mail",
    label: "Email Us",
    value: "hello@imanigifts.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: "call",
    label: "Call Us",
    value: "+1 (555) 012-3456",
    sub: "Mon–Fri, 8am–6pm",
  },
  {
    icon: "location_on",
    label: "Visit Us",
    value: "2200 Market St, San Francisco, CA",
    sub: "HQ & Operations Centre",
  },
  {
    icon: "schedule",
    label: "Working Hours",
    value: "Mon–Fri: 8am – 6pm",
    sub: "Sat: 9am – 2pm",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    });
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#f2ecd9] border-none rounded-lg text-sm focus:ring-2 ring-[#00442d]/20 outline-none placeholder:text-[#506357]/50 text-[#00442d] transition-all";

  const labelClass =
    "block text-xs font-bold text-[#506357] uppercase tracking-wider mb-1.5";

  return (
    <div className="bg-[#fff9eb] text-[#1f1c08]">
      <CustomerNav />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 px-8 md:px-12 bg-[#00442d] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />

          <motion.div
            className="max-w-4xl relative z-10"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#8cd4b0] mb-6 block"
            >
              Get in Touch
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              We&apos;re Here
              <br />
              <span className="italic font-light text-[#8cd4b0]">
                to Help.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-xl text-emerald-100/70 max-w-2xl leading-relaxed"
            >
              Whether you have a question about a shipment, need a custom
              quote, or want to explore a partnership — our team is ready.
            </motion.p>
          </motion.div>
        </section>

        {/* Contact Info */}
        <section className="py-16 px-8 md:px-12 bg-[#fdf4d3]">
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={index}
                className="bg-white p-6 rounded-xl border border-[#506357]/5 shadow-sm hover:border-[#00442d]/20 transition-colors"
              >
                <div className="w-10 h-10 bg-[#00442d]/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#00442d]">
                    {item.icon}
                  </span>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-widest text-[#506357] mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-[#00442d] leading-snug">
                  {item.value}
                </p>
                <p className="text-xs text-[#506357] mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Form + FAQ */}
        <section className="py-24 px-8 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-bold text-[#00442d] mb-2">
                Send a Message
              </h2>
              <p className="text-[#506357] mb-8">
                Fill in the form and we&apos;ll get back to you within one
                business day.
              </p>

              {submitted ? (
                <motion.div
                  className="bg-[#00442d] text-[#fff9eb] rounded-xl p-10 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-[#fff9eb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    Message Sent!
                  </h3>

                  <p className="text-emerald-100/70 mb-6">
                    Thank you, {form.name}. We&apos;ll be in touch at{" "}
                    {form.email} within 24 hours.
                  </p>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-[#fff9eb]/10 border border-[#fff9eb]/20 rounded-lg font-bold text-sm hover:bg-[#fff9eb]/20 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        value={form.name}
                        onChange={(e) =>
                          update("name", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          update("email", e.target.value)
                        }
                        className={inputClass}
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Phone (optional)
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          update("phone", e.target.value)
                        }
                        className={inputClass}
                        placeholder="+1 555 000 0000"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) =>
                          update("subject", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="general">
                          General Enquiry
                        </option>
                        <option value="quote">
                          Request a Quote
                        </option>
                        <option value="shipment">
                          Shipment Issue
                        </option>
                        <option value="partnership">
                          Partnership
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        update("message", e.target.value)
                      }
                      className={`${inputClass} resize-none`}
                      rows={5}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (
                        form.name &&
                        form.email &&
                        form.message
                      ) {
                        setSubmitted(true);
                      }
                    }}
                    className="w-full py-4 text-white font-bold rounded-lg text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg,#00442d 0%,#0f5d41 100%)",
                    }}
                  >
                    <span className="material-symbols-outlined text-base">
                      send
                    </span>
                    Send Message
                  </button>
                </div>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div>
                <h3 className="text-xl font-bold text-[#00442d] mb-5">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      q: "How do I track my shipment?",
                      a: "Log in to your dashboard and visit the Tracking page, or use the public tracker on our homepage with your tracking ID.",
                    },
                    {
                      q: "What documents do I need for freight?",
                      a: "Typically a commercial invoice, packing list, and bill of lading.",
                    },
                    {
                      q: "Do you offer insurance?",
                      a: "Yes. All shipments can be insured up to $50,000.",
                    },
                    {
                      q: "How long does delivery take?",
                      a: "Express: 1–2 days. Standard: 3–5 days. Economy: 7–14 days.",
                    },
                  ].map((faq, i) => (
                    <motion.div
                      key={i}
                      className="bg-[#faf3df] rounded-xl p-5 border border-[#506357]/5"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.4,
                      }}
                    >
                      <p className="text-sm font-bold text-[#00442d] mb-1">
                        {faq.q}
                      </p>
                      <p className="text-xs text-[#506357] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <CustomerFooter />
    </div>
  );
}