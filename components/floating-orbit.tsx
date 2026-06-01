"use client";

import { motion } from "framer-motion";

export function FloatingOrbit() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="aurora absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-80"
        animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-8 top-28 h-48 w-48 rounded-full border border-water/20"
        animate={{ y: [0, -18, 0], rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 h-28 w-28 rounded-full border border-gold/20"
        animate={{ y: [0, 16, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

