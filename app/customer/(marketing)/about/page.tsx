import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/Reveal";
import Icon from "@/components/shared/Icon";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2019, Imanigifts Logistics has grown into a full-service logistics partner serving businesses across Africa, Europe, and North America.",
};

const team = [
  { name: "Amara Osei", role: "CEO & Founder", avatar: "https://i.pravatar.cc/150?img=47" },
  { name: "Daniel Nwosu", role: "Head of Operations", avatar: "https://i.pravatar.cc/150?img=52" },
  { name: "Fatima Al-Rashid", role: "Logistics Director", avatar: "https://i.pravatar.cc/150?img=44" },
  { name: "James Okafor", role: "Head of Technology", avatar: "https://i.pravatar.cc/150?img=59" },
];

const values = [
  { icon: "verified_user", title: "Integrity", desc: "We operate with full transparency — no hidden fees, no surprises." },
  { icon: "eco", title: "Sustainability", desc: "40% of our fleet is electric. Net-zero is our 2030 target." },
  { icon: "monitoring", title: "Precision", desc: "99.8% on-time delivery backed by real-time tracking." },
  { icon: "groups", title: "Partnership", desc: "Your business growth is our success metric." },
];

const modes = [
  { bg: "bg-primary", text: "text-white", icon: "flight", label: "Air Freight" },
  { bg: "bg-highlight-deep", text: "text-primary", icon: "directions_boat", label: "Sea Freight" },
  { bg: "bg-highlight", text: "text-primary", icon: "warehouse", label: "Warehousing" },
  { bg: "bg-primary-dark", text: "text-white", icon: "local_shipping", label: "Road Freight" },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-on-surface">
      {/* Hero */}
      <section className="py-24 px-8 md:px-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-lines-lg" />
        <Reveal animateOnMount className="max-w-4xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6 block">
            Our Story
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Moving the World
            <br />
            <span className="italic font-light text-accent">
              One Shipment at a Time.
            </span>
          </h1>
          <Reveal delay={0.15} y={16}>
            <p className="text-xl text-accent/80 max-w-2xl leading-relaxed">
              Imanigifts Logistics was founded on a simple belief — that every
              business, regardless of size, deserves world-class logistics.
            </p>
          </Reveal>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="py-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal x={-40}>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 block">
              Our Mission
            </span>
            <h2 className="font-headline text-4xl font-bold text-primary mb-6 leading-tight">
              Logistics that empowers businesses to grow without limits.
            </h2>
            <p className="text-secondary leading-relaxed mb-6">
              Founded in 2019, Imanigifts Logistics started as a small regional
              courier and has grown into a full-service logistics partner
              serving businesses across Africa, Europe, and North America.
            </p>
            <p className="text-secondary leading-relaxed mb-8">
              We combine cutting-edge technology with a human-first approach to
              ensure every shipment arrives on time, every time — with complete
              visibility from pickup to delivery.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                ["2019", "Founded"],
                ["150+", "Global Routes"],
                ["50k+", "Shipments Delivered"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-headline text-3xl font-bold text-primary">
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-secondary mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal x={40}>
            <div className="grid grid-cols-2 gap-4">
              {modes.map((card) => (
                <div
                  key={card.label}
                  className={`${card.bg} rounded-xl p-8 flex flex-col items-center justify-center aspect-square`}
                >
                  <Icon
                    name={card.icon}
                    className={`text-5xl ${card.text} opacity-80 mb-3`}
                  />
                  <p className={`text-sm font-bold ${card.text}`}>
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8 md:px-12 bg-highlight">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              The principles that guide every decision we make.
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-surface-container-lowest rounded-xl p-6 border border-secondary/5 shadow-sm hover:border-primary/20 transition-colors h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={value.icon} className="text-primary" fill />
                  </div>
                  <h4 className="font-headline text-lg font-bold text-primary mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-8 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">
              Meet the Team
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              Experienced logistics professionals dedicated to your success.
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 border-4 border-background shadow-md relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <p className="font-bold text-primary">{member.name}</p>
                <p className="text-xs text-secondary mt-1">{member.role}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-12 bg-primary text-center">
        <Reveal amount={0.4} className="max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-white mb-4">
            Join thousands of businesses that trust Imanigifts.
          </h2>
          <p className="text-accent/80 mb-10">Start shipping smarter today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/customer/signup"
              className="bg-on-primary text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-highlight transition-colors shadow-lg active:scale-95"
            >
              Get Started
            </Link>
            <Link
              href="/customer/services"
              className="border-2 border-accent text-accent px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/5 transition-colors"
            >
              View Services
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
