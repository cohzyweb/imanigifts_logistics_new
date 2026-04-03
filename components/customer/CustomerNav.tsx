"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  ["Services", "#"],
  ["Tracking", "/customer/track"],
  ["About", "#"],
  ["Sustainability", "#"]
];

export default function CustomerNav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-[#fff9eb]/80 backdrop-blur-xl shadow-sm"
    >
      <div className="flex justify-between items-center px-8 md:px-12 py-5">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-8"
        >
          <Link href="/customer/landing" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#00442d] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#fff9eb]" style={{ fontSize: "18px" }}>
                card_giftcard
              </span>
            </div>
            <span className="text-xl font-bold text-[#00442d]" style={{ fontFamily: "Manrope,sans-serif" }}>
              Imanigifts
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(([l, h], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Link
                  href={h}
                  className="text-[#506357] hover:text-[#00442d] text-sm font-semibold transition-colors"
                >
                  {l}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <Link
            href="/customer/login"
            className="text-[#506357] hover:text-[#00442d] text-sm font-semibold hidden md:block"
          >
            Login
          </Link>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/customer/signup"
              className="text-[#fff9eb] px-5 py-2.5 rounded-lg font-semibold text-sm sig-gradient"
            >
              Sign Up
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#506357]"
            onClick={() => setOpen(!open)}
          >
            <span className="material-symbols-outlined">
              {open ? "close" : "menu"}
            </span>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-[#fff9eb] border-t border-[#506357]/10 px-8 py-5 flex flex-col gap-4 overflow-hidden"
          >
            {links.map(([l, h], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={h}
                  className="text-[#506357] font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {l}
                </Link>
              </motion.div>
            ))}

            <Link
              href="/customer/login"
              className="text-[#506357] font-semibold"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}