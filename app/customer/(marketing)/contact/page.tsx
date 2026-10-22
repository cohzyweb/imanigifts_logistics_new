import type { Metadata } from "next";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/Reveal";
import ContactForm from "@/components/marketing/ContactForm";
import Icon from "@/components/shared/Icon";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about a shipment, need a custom quote, or want to explore a partnership? Get in touch with the Imanigifts team.",
};

const contactInfo = [
  { icon: "mail", label: "Email Us", value: "hello@imanigifts.com", sub: "We reply within 24 hours" },
  { icon: "call", label: "Call Us", value: "+1 (555) 012-3456", sub: "Mon–Fri, 8am–6pm" },
  { icon: "location_on", label: "Visit Us", value: "2200 Market St, San Francisco, CA", sub: "HQ & Operations Centre" },
  { icon: "schedule", label: "Working Hours", value: "Mon–Fri: 8am – 6pm", sub: "Sat: 9am – 2pm" },
];

const faqs = [
  {
    q: "How do I track my shipment?",
    a: "Log in to your dashboard and visit the Tracking page, or use the track link in the top navigation with your tracking ID.",
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
];

export default function ContactPage() {
  return (
    <div className="bg-background text-on-surface">
      {/* Hero */}
      <section className="py-24 px-8 md:px-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-lines-lg" />
        <Reveal animateOnMount className="max-w-4xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6 block">
            Get in Touch
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            We&apos;re Here
            <br />
            <span className="italic font-light text-accent">to Help.</span>
          </h1>
          <Reveal delay={0.15} y={16}>
            <p className="text-xl text-accent/80 max-w-2xl leading-relaxed">
              Whether you have a question about a shipment, need a custom
              quote, or want to explore a partnership — our team is ready.
            </p>
          </Reveal>
        </Reveal>
      </section>

      {/* Contact info */}
      <section className="py-16 px-8 md:px-12 bg-highlight">
        <StaggerGroup className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item) => (
            <StaggerItem key={item.label}>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-secondary/5 shadow-sm hover:border-primary/20 transition-colors h-full">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={item.icon} className="text-primary" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-primary leading-snug">
                  {item.value}
                </p>
                <p className="text-xs text-secondary mt-1">{item.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Form + FAQ */}
      <section className="py-24 px-8 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal x={-40}>
            <h2 className="font-headline text-3xl font-bold text-primary mb-2">
              Send a Message
            </h2>
            <p className="text-secondary mb-8">
              Fill in the form and we&apos;ll get back to you within one
              business day.
            </p>
            <ContactForm />
          </Reveal>

          <Reveal x={40}>
            <h3 className="font-headline text-xl font-bold text-primary mb-5">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Reveal
                  key={faq.q}
                  y={10}
                  delay={index * 0.1}
                  amount={0.4}
                  className="bg-surface-container-low rounded-xl p-5 border border-secondary/5"
                >
                  <p className="text-sm font-bold text-primary mb-1">
                    {faq.q}
                  </p>
                  <p className="text-xs text-secondary leading-relaxed">
                    {faq.a}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
