"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  amount?: number;
  className?: string;
  animateOnMount?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  amount = 0.2,
  className = "",
  animateOnMount = false,
}: RevealProps) {
  const from = { opacity: 0, y, x };
  const to = { opacity: 1, y: 0, x: 0 };
  const transition = { duration: 0.6, delay, ease: EASE };

  return (
    <motion.div
      initial={from}
      {...(animateOnMount
        ? { animate: to }
        : { whileInView: to, viewport: { once: true, amount } })}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerGroup({
  children,
  className = "",
  animateOnMount = false,
}: {
  children: ReactNode;
  className?: string;
  animateOnMount?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      {...(animateOnMount ? { animate: "visible" } : { whileInView: "visible" })}
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function HoverScale({
  children,
  scale = 1.05,
  className = "",
}: {
  children: ReactNode;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
