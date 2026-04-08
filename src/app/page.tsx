"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CTAStrip, conditions } from "@/components/cta-strip";

export default function Home() {
  const [condition, setCondition] = useState("today");

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Condition picker */}
      <div
        className="flex items-center justify-center bg-[#111]"
        style={{ gap: 4, padding: "12px 32px" }}
      >
        {conditions.map((c) => (
          <button
            key={c.id}
            onClick={() => setCondition(c.id)}
            style={{ padding: "6px 12px", fontSize: 13, lineHeight: "16px" }}
            className={`rounded-full transition-colors duration-200 cursor-pointer ${
              condition === c.id
                ? "bg-white text-black font-medium"
                : "bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.12)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Strip CTA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={condition}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <CTAStrip condition={condition} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
