"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/shared/Logo";
import Icon from "@/components/shared/Icon";

const links: Array<[string, string]> = [
  ["Services", "/customer/services"],
  ["Tracking", "/customer/track"],
  ["About", "/customer/about"],
  ["Contact us", "/customer/contact"],
];

export default function CustomerNav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl shadow-sm"
      aria-label="Main"
    >
      <div className="flex justify-between items-center px-8 md:px-12 py-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-8"
        >
          <Logo href="/customer/landing" size="sm" />

          <div className="hidden md:flex items-center gap-7">
            {links.map(([label, href], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={href}
                  className="text-secondary hover:text-primary text-sm font-semibold transition-colors"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <Link
            href="/customer/login"
            className="text-secondary hover:text-primary text-sm font-semibold hidden md:block"
          >
            Login
          </Link>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/customer/signup"
              className="text-on-primary px-5 py-2.5 rounded-lg font-semibold text-sm sig-gradient"
            >
              Sign Up
            </Link>
          </motion.div>

          <button
            type="button"
            className="md:hidden p-2 text-secondary"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-background border-t border-secondary/10 px-8 py-5 flex flex-col gap-4 overflow-hidden"
          >
            {links.map(([label, href], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={href}
                  className="text-secondary font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            <Link
              href="/customer/login"
              className="text-secondary font-semibold"
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
