import type { Metadata } from "next";
import Link from "next/link";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/Reveal";
import Icon from "@/components/shared/Icon";

export const metadata: Metadata = {
  title: "Logistics Services",
  description:
    "Freight forwarding, transportation management, warehousing, customs clearance, e-commerce fulfillment, and last-mile delivery.",
};

const services = [
  {
    id: "01",
    icon: "flight",
    title: "Freight Forwarding",
    desc: "International and domestic freight forwarding with full customs clearance, documentation, and compliance support. We handle the complexity so you focus on your business.",
    features: ["Air & sea freight", "Customs clearance", "Door-to-door delivery", "Real-time tracking"],
    color: "bg-primary",
    textColor: "text-white",
    subColor: "text-accent",
  },
  {
    id: "02",
    icon: "directions_boat",
    title: "Transportation Management",
    desc: "Optimized transport solutions with full route planning, load optimization, and real-time fleet visibility across all carrier types.",
    features: ["Route optimization", "Fleet tracking", "Multi-carrier support", "Cost analytics"],
    color: "bg-on-surface",
    textColor: "text-white",
    subColor: "text-error/90",
  },
  {
    id: "03",
    icon: "warehouse",
    title: "Warehousing & Distribution",
    desc: "Secure, climate-controlled storage facilities with efficient pick-and-pack operations and last-mile distribution capabilities.",
    features: ["Climate-controlled storage", "Pick & pack", "Inventory management", "Last-mile delivery"],
    color: "bg-highlight-deep",
    textColor: "text-primary",
    subColor: "text-secondary",
  },
  {
    id: "04",
    icon: "inventory_2",
    title: "Customs Clearance",
    desc: "End-to-end evaluation of supply chain operations, including process optimization and technology integration, aimed at lowering costs and strengthening operational resilience.",
    features: ["Process audit", "Cost optimization", "Tech integration", "Risk management"],
    color: "bg-surface-container-low",
    textColor: "text-primary",
    subColor: "text-secondary",
  },
  {
    id: "05",
    icon: "local_shipping",
    title: "E-commerce Fulfillment",
    desc: "Time-sensitive delivery solutions for urgent e-commerce orders. Our dedicated express network ensures reliable, on-time fulfilment with end-to-end visibility and secure chain-of-custody.",
    features: ["Order processing", "Inventory management", "Signature on delivery", "Priority handling"],
    color: "bg-primary/10",
    textColor: "text-primary",
    subColor: "text-secondary",
  },
  {
    id: "06",
    icon: "verified_user",
    title: "Last-Mile Delivery",
    desc: "Comprehensive last-mile coverage options protecting goods against loss, damage, and theft during final delivery, ensuring secure handoff from distribution hub to the customer’s doorstep.",
    features: ["All-risk protection", "Coverage extension", "Fast claims processing", "Flexible plans"],
    color: "bg-primary-dark",
    textColor: "text-white",
    subColor: "text-accent",
  },
];

const process = [
  { step: "01", icon: "edit_note", title: "Book Online", desc: "Fill in your shipment details and get an instant quote." },
  { step: "02", icon: "inventory_2", title: "We Collect", desc: "Our team picks up from your location at a scheduled time." },
  { step: "03", icon: "local_shipping", title: "We Ship", desc: "Your cargo moves through our verified logistics network." },
  { step: "04", icon: "task_alt", title: "Delivered", desc: "Confirmed delivery with proof and digital receipt." },
];

export default function ServicesPage() {
  return (
    <div className="bg-background text-on-surface">
      {/* Hero */}
      <section className="py-24 px-8 md:px-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-lines-lg" />
        <Reveal animateOnMount className="max-w-4xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6 block">
            What We Offer
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Logistics Solutions
            <br />
            <span className="italic font-light text-accent">
              Built for Your Business.
            </span>
          </h1>
          <Reveal delay={0.15} y={16}>
            <p className="text-xl text-accent/80 max-w-2xl leading-relaxed">
              From freight forwarding to last-mile delivery, we provide
              reliable, scalable, and efficient logistics services tailored to
              your industry needs.
            </p>
          </Reveal>
        </Reveal>
      </section>

      {/* Services grid */}
      <section className="py-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <div
                  className={`${service.color} rounded-xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 h-full`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${service.subColor}`}
                    >
                      Service {service.id}
                    </span>
                    <Icon
                      name={service.icon}
                      className={`opacity-20 text-5xl ${service.textColor}`}
                    />
                  </div>
                  <h3
                    className={`font-headline text-2xl font-bold mb-3 ${service.textColor}`}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${service.subColor}`}>
                    {service.desc}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 text-xs font-medium ${service.subColor}`}
                      >
                        <Icon name="check_circle" className="text-sm" fill />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-8 md:px-12 bg-highlight">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              From booking to delivery, a streamlined process designed for your
              peace of mind.
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item) => (
              <StaggerItem key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name={item.icon} className="text-on-primary text-2xl" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Step {item.step}
                </span>
                <h4 className="font-headline text-lg font-bold text-primary mt-1 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-12 bg-primary text-center">
        <Reveal amount={0.4} className="max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-accent/80 mb-10">
            Book your first shipment today or speak with our logistics team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/customer/orders"
              className="bg-on-primary text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-highlight transition-colors shadow-lg active:scale-95"
            >
              Book a Shipment
            </Link>
            <Link
              href="/customer/contact"
              className="border-2 border-accent text-accent px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/5 transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
