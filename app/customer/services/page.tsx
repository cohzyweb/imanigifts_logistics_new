"use client";
import CustomerNav from "@/components/customer/CustomerNav";
import CustomerFooter from "@/components/customer/CustomerFooter";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

const services = [
  {
    id: "01", icon: "flight", title: "Freight Forwarding",
    desc: "International and domestic freight forwarding with full customs clearance, documentation, and compliance support. We handle the complexity so you focus on your business.",
    features: ["Air & sea freight", "Customs clearance", "Door-to-door delivery", "Real-time tracking"],
    color: "bg-[#00442d]", textColor: "text-white", subColor: "text-[#8cd4b0]",
  },
  {
    id: "02", icon: "directions_boat", title: "Transportation Management",
    desc: "Optimized transport solutions with full route planning, load optimization, and real-time fleet visibility across all carrier types.",
    features: ["Route optimization", "Fleet tracking", "Multi-carrier support", "Cost analytics"],
    color: "bg-[#1f1c08]", textColor: "text-white", subColor: "text-[#ffdad7]",
  },
  {
    id: "03", icon: "warehouse", title: "Warehousing & Distribution",
    desc: "Secure, climate-controlled storage facilities with efficient pick-and-pack operations and last-mile distribution capabilities.",
    features: ["Climate-controlled storage", "Pick & pack", "Inventory management", "Last-mile delivery"],
    color: "bg-[#ebe3c2]", textColor: "text-[#00442d]", subColor: "text-[#506357]",
  },
  {
    id: "04", icon: "inventory_2", title: "Customs Clearance",
    desc: "End-to-end evaluation of supply chain operations, including process optimization and technology integration, aimed at lowering costs and strengthening operational resilience.",
    features: ["Process audit", "Cost optimization", "Tech integration", "Risk management"],
    color: "bg-[#faf3df]", textColor: "text-[#00442d]", subColor: "text-[#506357]",
  },
  {
    id: "05", icon: "local_shipping", title: "E-commerce Fulfillment",
    desc: "Time-sensitive delivery solutions for urgent e-commerce orders. Our dedicated express network ensures reliable, on-time fulfilment with end-to-end visibility and secure chain-of-custody.",
    features: ["Order processing", "Inventory management", "Signature on delivery", "Priority handling"],
    color: "bg-[#00442d]/10", textColor: "text-[#00442d]", subColor: "text-[#506357]",
  },
  {
    id: "06", icon: "verified_user", title: "Last-Mile Delivery",
    desc: "Comprehensive last-mile coverage options protecting goods against loss, damage, and theft during final delivery, ensuring secure handoff from distribution hub to the customer’s doorstep.",
    features: ["All-risk protection", "Coverage extension", "Fast and efficient claims processing", "Flexible plans"],
    color: "bg-[#0f5d41]", textColor: "text-white", subColor: "text-[#8cd4b0]",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#fff9eb] text-[#1f1c08]">
      <CustomerNav />
      <main className="pt-24">

        {/* Hero */}
        <section className="py-24 px-8 md:px-12 bg-[#00442d] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
          <motion.div className="max-w-4xl relative z-10"
            initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} custom={0}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#8cd4b0] mb-6 block">
              What We Offer
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Logistics Solutions<br />
              <span className="italic font-light text-[#8cd4b0]">Built for Your Business.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2}
              className="text-xl text-emerald-100/70 max-w-2xl leading-relaxed">
              From freight forwarding to last-mile delivery, we provide reliable, scalable, and efficient logistics services tailored to your industry needs.
            </motion.p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-8 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once: true, amount: 0.1 }}>
              {services.map((s, i) => (
                <motion.div key={s.id} variants={fadeUp} custom={i}
                  className={`${s.color} rounded-xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
                  <div className="flex items-start justify-between mb-6">
                    <span className={`text-xs font-bold uppercase tracking-widest ${s.subColor}`}>Service {s.id}</span>
                    <span className={`material-symbols-outlined opacity-20 text-5xl ${s.textColor}`}>{s.icon}</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${s.textColor}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${s.subColor}`}>{s.desc}</p>
                  <ul className="space-y-2">
                    {s.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-xs font-medium ${s.subColor}`}>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 px-8 md:px-12 bg-[#fdf4d3]">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-16"
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} custom={0}
                className="text-4xl font-bold text-[#00442d] mb-4">How It Works</motion.h2>
              <motion.p variants={fadeUp} custom={1}
                className="text-[#506357] max-w-xl mx-auto">
                From booking to delivery, a streamlined process designed for your peace of mind.
              </motion.p>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8"
              variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              {[
                { step: "01", icon: "edit_note",       title: "Book Online",      desc: "Fill in your shipment details and get an instant quote." },
                { step: "02", icon: "inventory_2",     title: "We Collect",       desc: "Our team picks up from your location at a scheduled time." },
                { step: "03", icon: "local_shipping",  title: "We Ship",          desc: "Your cargo moves through our verified logistics network." },
                { step: "04", icon: "task_alt",        title: "Delivered",        desc: "Confirmed delivery with proof and digital receipt." },
              ].map((p, i) => (
                <motion.div key={p.step} variants={fadeUp} custom={i} className="text-center">
                  <div className="w-16 h-16 bg-[#00442d] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="material-symbols-outlined text-[#fff9eb] text-2xl">{p.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#506357]">Step {p.step}</span>
                  <h4 className="text-lg font-bold text-[#00442d] mt-1 mb-2">{p.title}</h4>
                  <p className="text-sm text-[#506357] leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-8 md:px-12 bg-[#00442d] text-center">
          <motion.div className="max-w-3xl mx-auto"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <motion.h2 variants={fadeUp} custom={0}
              className="text-4xl font-bold text-white mb-4">Ready to get started?</motion.h2>
            <motion.p variants={fadeUp} custom={1}
              className="text-emerald-100/70 mb-10">
              Book your first shipment today or speak with our logistics team.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <Link href="/customer/orders"
                className="bg-[#fff9eb] text-[#00442d] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#fdf4d3] transition-colors shadow-lg active:scale-95">
                Book a Shipment
              </Link>
              <Link href="/customer/contact"
                className="border-2 border-[#8cd4b0] text-[#8cd4b0] px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/5 transition-colors">
                Talk to Us
              </Link>
            </motion.div>
          </motion.div>
        </section>

      </main>
      <CustomerFooter />
    </div>
  );
}