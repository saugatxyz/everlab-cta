"use client";

import { motion } from "framer-motion";
import { AVATAR_SRC } from "./shared";

const conditions = [
  { id: "today", word: "today", label: "Today" },
  { id: "tomorrow", word: "tomorrow", label: "Tomorrow" },
  { id: "next-week", word: "\u00B7 Wed, 15 Apr", label: "Next Week" },
  { id: "later", word: "Apr 28", label: "Later" },
];

export { conditions as cardConditions };

const TIMES = ["2:30 PM", "3:15 PM", "4:20 PM"];

// ─── Floating Card ───────────────────────────────────────────

export function FloatingCard({
  condition,
  material = "black",
}: {
  condition: string;
  material?: "black" | "glass";
}) {
  const active = conditions.find((c) => c.id === condition) ?? conditions[0];
  const titleText = `Book your free discovery call ${active.word}`;

  const bgStyle =
    material === "glass"
      ? { background: "rgba(0,0,0,0.16)", backdropFilter: "blur(128px)", WebkitBackdropFilter: "blur(128px)" }
      : { background: "black" };

  return (
    <div className="fixed z-50" style={{ bottom: 32, right: 32 }}>
      <motion.div
        initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
        animate={{
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { type: "spring" as const, bounce: 0.1, duration: 0.6, delay: 0.2 },
        }}
        className="flex flex-col overflow-hidden"
        style={{ ...bgStyle, padding: 12, borderRadius: 24, gap: 12 }}
      >
        {/* Row 1: Avatar + stacked text */}
        <div className="flex items-center" style={{ gap: 12 }}>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.3 } }}
            src={AVATAR_SRC}
            alt=""
            className="rounded-full shrink-0 object-cover"
            style={{ width: 40, height: 40 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.45, duration: 0.3 } }}
            className="flex flex-col"
            style={{ gap: 2 }}
          >
            <p
              className="whitespace-nowrap"
              style={{ fontSize: 14, lineHeight: "18px", fontWeight: 500, color: "white" }}
            >
              {titleText}
            </p>
            <div className="flex items-start" style={{ gap: 8 }}>
              <span
                className="whitespace-nowrap"
                style={{ fontSize: 12, lineHeight: "14px", color: "rgba(255,255,255,0.64)" }}
              >
                15 min, no commitments
              </span>
              <span
                className="whitespace-nowrap"
                style={{ fontSize: 12, lineHeight: "14px", color: "rgba(255,255,255,0.64)" }}
              >
                🇦🇺 AEST
              </span>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Static time pills + Find time */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.35 } }}
          className="flex items-center"
          style={{ gap: 4 }}
        >
          {TIMES.map((time) => (
            <div
              key={time}
              className="flex items-center justify-center shrink-0"
              style={{
                height: 28,
                paddingLeft: 12,
                paddingRight: 12,
                border: "1px solid rgba(255,255,255,0.24)",
                borderRadius: 9999,
              }}
            >
              <span
                className="whitespace-nowrap"
                style={{ fontSize: 12, lineHeight: "14px", color: "white" }}
              >
                {time}
              </span>
            </div>
          ))}

          <button
            className="flex items-center justify-center shrink-0 cursor-pointer"
            style={{
              height: 28,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 9999,
              background: "white",
              fontSize: 12,
              lineHeight: "14px",
              fontWeight: 500,
              color: "black",
              gap: 6,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5.5 1.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M10.5 1.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Find time
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
