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

const team = [
  { name: "Amara Osei",      role: "CEO & Founder",         avatar: "https://i.pravatar.cc/150?img=47" },
  { name: "Daniel Nwosu",    role: "Head of Operations",    avatar: "https://i.pravatar.cc/150?img=52" },
  { name: "Fatima Al-Rashid",role: "Logistics Director",    avatar: "https://i.pravatar.cc/150?img=44" },
  { name: "James Okafor",    role: "Head of Technology",    avatar: "https://i.pravatar.cc/150?img=59" },
];

const values = [
  { icon: "verified_user",  title: "Integrity",     desc: "We operate with full transparency — no hidden fees, no surprises." },
  { icon: "eco",            title: "Sustainability", desc: "40% of our fleet is electric. Net-zero is our 2030 target." },
  { icon: "monitoring",     title: "Precision",     desc: "99.8% on-time delivery backed by real-time tracking." },
  { icon: "groups",         title: "Partnership",   desc: "Your business growth is our success metric." },
];

export default function AboutPage() {
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
              Our Story
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Moving the World<br />
              <span className="italic font-light text-[#8cd4b0]">One Shipment at a Time.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2}
              className="text-xl text-emerald-100/70 max-w-2xl leading-relaxed">
              Imanigifts Logistics was founded on a simple belief — that every business, regardless of size, deserves world-class logistics.
            </motion.p>
          </motion.div>
        </section>

        {/* Mission */}
        <section className="py-24 px-8 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#506357] mb-4 block">Our Mission</span>
              <h2 className="text-4xl font-bold text-[#00442d] mb-6 leading-tight">
                Logistics that empowers businesses to grow without limits.
              </h2>
              <p className="text-[#506357] leading-relaxed mb-6">
                Founded in 2019, Imanigifts Logistics started as a small regional courier and has grown into a full-service logistics partner serving businesses across Africa, Europe, and North America.
              </p>
              <p className="text-[#506357] leading-relaxed mb-8">
                We combine cutting-edge technology with a human-first approach to ensure every shipment arrives on time, every time — with complete visibility from pickup to delivery.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[["2019", "Founded"], ["150+", "Global Routes"], ["50k+", "Shipments Delivered"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-3xl font-bold text-[#00442d]">{v}</p>
                    <p className="text-xs uppercase tracking-widest text-[#506357] mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              {[
                { bg: "bg-[#00442d]",  text: "text-white",      icon: "flight",          label: "Air Freight" },
                { bg: "bg-[#ebe3c2]",  text: "text-[#00442d]",  icon: "directions_boat", label: "Sea Freight" },
                { bg: "bg-[#fdf4d3]",  text: "text-[#00442d]",  icon: "warehouse",       label: "Warehousing" },
                { bg: "bg-[#0f5d41]",  text: "text-white",      icon: "local_shipping",  label: "Road Freight" },
              ].map(card => (
                <div key={card.label} className={`${card.bg} rounded-xl p-8 flex flex-col items-center justify-center aspect-square`}>
                  <span className={`material-symbols-outlined text-5xl ${card.text} opacity-80 mb-3`}>{card.icon}</span>
                  <p className={`text-sm font-bold ${card.text}`}>{card.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-8 md:px-12 bg-[#fdf4d3]">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16"
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} custom={0}
                className="text-4xl font-bold text-[#00442d] mb-4">Our Core Values</motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-[#506357] max-w-xl mx-auto">
                The principles that guide every decision we make.
              </motion.p>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              {values.map((v, i) => (
                <motion.div key={v.title} variants={fadeUp} custom={i}
                  className="bg-white rounded-xl p-6 border border-[#506357]/5 shadow-sm hover:border-[#00442d]/20 transition-colors">
                  <div className="w-12 h-12 bg-[#00442d]/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[#00442d]"
                      style={{ fontVariationSettings: "'FILL' 1" }}>{v.icon}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#00442d] mb-2">{v.title}</h4>
                  <p className="text-sm text-[#506357] leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 px-8 md:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-16"
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} custom={0}
                className="text-4xl font-bold text-[#00442d] mb-4">Meet the Team</motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-[#506357] max-w-xl mx-auto">
                Experienced logistics professionals dedicated to your success.
              </motion.p>
            </motion.div>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              {team.map((member, i) => (
                <motion.div key={member.name} variants={fadeUp} custom={i} className="text-center">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 border-4 border-[#fff9eb] shadow-md">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-[#00442d]">{member.name}</p>
                  <p className="text-xs text-[#506357] mt-1">{member.role}</p>
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
              className="text-4xl font-bold text-white mb-4">
              Join thousands of businesses that trust Imanigifts.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-emerald-100/70 mb-10">
              Start shipping smarter today.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <Link href="/customer/signup"
                className="bg-[#fff9eb] text-[#00442d] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#fdf4d3] transition-colors shadow-lg active:scale-95">
                Get Started
              </Link>
              <Link href="/customer/services"
                className="border-2 border-[#8cd4b0] text-[#8cd4b0] px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/5 transition-colors">
                View Services
              </Link>
            </motion.div>
          </motion.div>
        </section>

      </main>
      <CustomerFooter />
    </div>
  );
}