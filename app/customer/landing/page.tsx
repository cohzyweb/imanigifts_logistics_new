"use client";
import CustomerNav from "@/components/customer/CustomerNav";
import CustomerFooter from "@/components/customer/CustomerFooter";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomerLanding() {
  return (
    <div className="bg-[#fff9eb] text-[#1f1c08]">
      <CustomerNav />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center px-8 md:px-12 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#00442d 0,#00442d 1px,transparent 0,transparent 50%)",
              backgroundSize: "20px 20px"
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#506357] mb-6 block">
              Premium Logistics Platform
            </span>

            <h1 className="text-[3.5rem] md:text-[3rem] leading-[1.05] font-bold text-[#00442d] mb-8 tracking-tighter">
              Reliable Logistics<br />
              <span className="italic font-light">& Supply Chain Solutions.</span>
            </h1>

            <p className="text-xl text-[#506357] max-w-2xl mb-12 leading-relaxed">
              Elevating logistics into a premium experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/customer/signup" className="text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl inline-flex items-center gap-2 sig-gradient">
                  Get Started
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/customer/track" className="bg-[#ebe3c2] text-[#00442d] px-8 py-4 rounded-lg font-bold text-lg">
                  Track Shipment
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="flex gap-12 mt-16"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
            >
              {[["99.8%", "Precision Rate"], ["150+", "Global Routes"], ["24/7", "Expert Support"]].map(([v, l]) => (
                <motion.div
                  key={l}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <p className="text-3xl font-bold text-[#00442d]">{v}</p>
                  <p className="text-xs uppercase text-[#506357]">{l}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Services */}
        <section className="py-28 px-8 md:px-12">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6">

            {[ "Freight Forwarding", "Transportation Management", "Warehousing & Distribution" ].map((title, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`rounded-xl p-10 ${i === 0 ? "md:col-span-8 bg-[#00442d]" : i === 1 ? "md:col-span-4 bg-[#1f1c08]" : "md:col-span-12 bg-[#ebe3c2]"}`}
              >
                <h3 className={`text-2xl font-bold ${i === 2 ? "text-[#00442d]" : "text-white"}`}>
                  {title}
                </h3>
              </motion.div>
            ))}

          </div>
        </section>

        {/* Features */}
        <section className="py-28 px-8 md:px-12 bg-[#fdf4d3]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-[#ebe3c2] rounded-xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-[#00442d] mb-10">
                Why Businesses Choose Us
              </h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.2 } }
                }}
                className="space-y-10"
              >
                {["Cost-Effective Shipping", "Real-Time Tracking", "Certified Team"].map((t) => (
                  <motion.div
                    key={t}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <h4 className="font-semibold text-[#00442d]">{t}</h4>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="py-28 px-8 md:px-12 bg-[#00442d] text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to elevate your business?
          </h2>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/customer/signup" className="bg-white text-[#00442d] px-8 py-4 rounded-lg font-bold">
              Get Started
            </Link>
          </motion.div>
        </motion.section>
      </main>

      <CustomerFooter />
    </div>
  );
}