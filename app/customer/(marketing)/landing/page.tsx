import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  HoverScale,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/Reveal";
import Icon from "@/components/shared/Icon";

export const metadata: Metadata = {
  title: "Reliable Logistics & Supply Chain Solutions",
  description:
    "Premium freight forwarding, transportation management, and warehousing with real-time shipment tracking — built for the modern enterprise.",
};

const stats: Array<[string, string]> = [
  ["99.8%", "Precision Rate"],
  ["150+", "Global Routes"],
  ["24/7", "Expert Support"],
];

const features = [
  {
    icon: "eco",
    title: "Cost-Effective Shipping",
    desc: "Affordable, reliable delivery with transparent pricing — helping your business save more on every shipment.",
  },
  {
    icon: "monitoring",
    title: "Real-Time Tracking",
    desc: "Full visibility of your shipments every step of the way, for peace of mind and better planning.",
  },
  {
    icon: "verified_user",
    title: "Certified & Experienced Team",
    desc: "A certified, experienced team handling your shipments with professionalism, care, and efficiency.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-background text-on-surface">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center px-8 md:px-12 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pattern-lines-primary" />

        <Reveal animateOnMount y={40} className="relative z-10 max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-6 block">
            Premium Logistics Platform
          </span>

          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-bold text-primary mb-8 tracking-tighter">
            Reliable Logistics
            <br />
            <span className="italic font-light">& Supply Chain Solutions.</span>
          </h1>

          <Reveal delay={0.2} y={16}>
            <p className="text-xl text-secondary max-w-2xl mb-12 leading-relaxed">
              Elevating logistics into a premium experience. Bespoke delivery
              solutions for the modern enterprise, anchored in sustainability
              and precision.
            </p>
          </Reveal>

          <div className="flex flex-col sm:flex-row gap-4">
            <HoverScale>
              <Link
                href="/customer/signup"
                className="text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl inline-flex items-center gap-2 sig-gradient"
              >
                Get Started <Icon name="arrow_forward" />
              </Link>
            </HoverScale>
            <HoverScale>
              <Link
                href="/customer/track"
                className="bg-highlight-deep text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-surface-container-high transition-colors"
              >
                Track Shipment
              </Link>
            </HoverScale>
          </div>

          <StaggerGroup
            animateOnMount
            className="flex gap-8 sm:gap-12 mt-16 flex-wrap"
          >
            {stats.map(([value, label]) => (
              <StaggerItem key={label}>
                <p className="text-3xl font-headline font-bold text-primary">
                  {value}
                </p>
                <p className="text-xs uppercase tracking-widest text-secondary mt-1">
                  {label}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </section>

      {/* Services */}
      <section className="py-28 px-8 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-3xl font-semibold text-primary mb-4">
              Services
            </h2>
            <div className="w-24 h-1 bg-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Reveal className="md:col-span-8">
              <div className="bg-primary rounded-xl p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-end h-full">
                <Icon
                  name="flight"
                  className="text-white/10 absolute top-6 right-6 text-[100px]"
                />
                <div className="relative z-10">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">
                    Service 01
                  </span>
                  <h3 className="font-headline text-white text-4xl font-bold mb-3">
                    Freight Forwarding
                  </h3>
                  <p className="text-accent/80 max-w-md text-sm">
                    International and domestic freight solutions you can rely
                    on.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-4">
              <div className="bg-on-surface rounded-xl p-8 relative overflow-hidden min-h-[200px] flex flex-col justify-end h-full">
                <Icon
                  name="directions_boat"
                  className="text-white/10 absolute top-4 right-4 text-[80px]"
                />
                <div className="relative z-10">
                  <span className="text-error/80 text-xs font-bold uppercase tracking-widest mb-2 block">
                    Service 02
                  </span>
                  <h3 className="font-headline text-white text-3xl font-bold mb-2">
                    Transportation Management
                  </h3>
                  <p className="text-white/60 text-sm">
                    Optimized transport solutions with real-time visibility.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="md:col-span-12">
              <div className="bg-highlight-deep rounded-xl p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">
                    Service 03
                  </span>
                  <h3 className="font-headline text-primary text-4xl font-bold mb-3">
                    Warehousing & Distribution
                  </h3>
                  <p className="text-secondary leading-relaxed mb-6 max-w-xl">
                    Secure storage and efficient distribution services.
                  </p>
                  <Link
                    href="/customer/orders"
                    className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Book Now <Icon name="arrow_forward" />
                  </Link>
                </div>
                <Icon
                  name="local_shipping"
                  className="text-primary opacity-15 text-[140px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-8 md:px-12 bg-highlight">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal x={-50} className="relative">
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <Image
                src="/warehouse.png"
                alt="Imanigifts logistics warehouse"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-xl shadow-xl text-white">
              <div className="font-headline text-4xl font-bold">99.8%</div>
              <div className="text-accent/80 text-xs uppercase tracking-widest mt-1">
                Precision Rate
              </div>
            </div>
          </Reveal>

          <Reveal x={50}>
            <h2 className="font-headline text-4xl font-bold text-primary mb-10">
              Why Businesses Choose Imani Gift Logistics.
            </h2>

            <StaggerGroup className="space-y-10">
              {features.map((feature) => (
                <StaggerItem key={feature.title} className="flex gap-5">
                  <div className="bg-primary-dark text-accent w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                    <Icon name={feature.icon} />
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-semibold text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-secondary text-sm">{feature.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <Reveal animateOnMount y={0} amount={0.3}>
        <section className="py-28 px-8 md:px-12 bg-primary text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to elevate your business ?
            </h2>
            <p className="text-accent/80 text-lg mb-12 max-w-xl mx-auto">
              Join the new standard of logistics. Experience speed, security,
              and sustainability.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <HoverScale>
                <Link
                  href="/customer/signup"
                  className="bg-on-primary text-primary px-10 py-4 rounded-lg font-bold text-lg shadow-lg inline-block hover:bg-highlight transition-colors"
                >
                  Create Account
                </Link>
              </HoverScale>
              <HoverScale>
                <Link
                  href="/customer/contact"
                  className="border-2 border-accent text-accent px-10 py-4 rounded-lg font-bold text-lg inline-block hover:bg-white/5 transition-colors"
                >
                  Speak to an Expert
                </Link>
              </HoverScale>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
