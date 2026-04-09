"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AVATARS_SRC, ARROW_SVG } from "./shared";

const conditions = [
  { id: "today", word: "today", label: "Today", showTime: true },
  { id: "tomorrow", word: "tomorrow", label: "Tomorrow", showTime: true },
  { id: "next-week", word: "\u00B7 Wed, 15 Apr", label: "Next Week", showTime: true },
  { id: "later", word: "Apr 28", label: "Later", showTime: false },
  { id: "none", word: "", label: "No date", showTime: false },
];

export { conditions as pillConditions };

const TIMES = ["1:20 PM", "2:45 PM", "3:30 PM", "4:15 PM"];
const TIME_HOLD = 2000;

// ─── Character Cascade ───────────────────────────────────────

function splitGraphemes(str: string): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter("en", { granularity: "grapheme" });
    return [...seg.segment(str)].map((s) => s.segment);
  }
  return [...str];
}

function CascadeWord({ text }: { text: string }) {
  const chars = splitGraphemes(text);
  return (
    <>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
          animate={{
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { type: "spring" as const, bounce: 0, duration: 0.35, delay: i * 0.018 },
          }}
          exit={{
            y: -14,
            opacity: 0,
            filter: "blur(4px)",
            transition: { type: "spring" as const, bounce: 0, duration: 0.25, delay: i * 0.012 },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

// ─── Time Roller ─────────────────────────────────────────────

function TimeRoller() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % TIMES.length);
    }, TIME_HOLD);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 18, width: 52 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={TIMES[index]}
          initial={{ y: 18, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, bounce: 0, duration: 0.3 },
          }}
          exit={{
            y: -18,
            opacity: 0,
            transition: { type: "spring" as const, bounce: 0, duration: 0.2 },
          }}
          className="absolute whitespace-nowrap"
          style={{
            fontSize: 14,
            lineHeight: "18px",
            fontWeight: 500,
            color: "white",
          }}
        >
          {TIMES[index]}
        </motion.span>
      </AnimatePresence>
      {/* Ghost above */}
      <span
        className="absolute whitespace-nowrap pointer-events-none"
        style={{
          fontSize: 14,
          lineHeight: "18px",
          fontWeight: 500,
          color: "white",
          top: -12,
          opacity: 0.15,
          maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
        }}
      >
        {TIMES[(index + TIMES.length - 1) % TIMES.length]}
      </span>
      {/* Ghost below */}
      <span
        className="absolute whitespace-nowrap pointer-events-none"
        style={{
          fontSize: 14,
          lineHeight: "18px",
          fontWeight: 500,
          color: "white",
          bottom: -12,
          opacity: 0.15,
          maskImage: "linear-gradient(to bottom, white 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 0%, transparent 80%)",
        }}
      >
        {TIMES[(index + 1) % TIMES.length]}
      </span>
    </div>
  );
}

// ─── Floating Pill ───────────────────────────────────────────

export function FloatingPill({
  condition,
  material = "black",
}: {
  condition: string;
  material?: "black" | "glass";
}) {
  const active = conditions.find((c) => c.id === condition) ?? conditions[0];
  const showDate = active.word !== "";

  const titleText = showDate
    ? `Book your discovery call ${active.word}`
    : "Book your discovery call";

  const bgStyle =
    material === "glass"
      ? { background: "rgba(0,0,0,0.16)", backdropFilter: "blur(128px)", WebkitBackdropFilter: "blur(128px)" }
      : { background: "black" };

  const buttonBg = material === "glass"
    ? { background: "rgba(255,255,255,0.9)", backdropFilter: "blur(128px)" }
    : { background: "white" };

  return (
    <div
      className="fixed z-50 flex justify-center"
      style={{ bottom: 32, left: 0, right: 0 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
        animate={{
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { type: "spring" as const, bounce: 0.1, duration: 0.6, delay: 0.2 },
        }}
        className="flex items-center rounded-full overflow-hidden"
        style={{ ...bgStyle, padding: "4px 6px 4px 4px", gap: 12 }}
      >
        {/* Avatar */}
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.3 } }}
          src={AVATARS_SRC}
          alt=""
          className="rounded-full shrink-0 object-cover"
          style={{ width: 40, height: 40 }}
        />

        {/* Title text — sizes to current content */}
        <div
          className="overflow-hidden"
          style={{ height: 18 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={titleText}
              className="inline-flex whitespace-nowrap"
              style={{
                fontSize: 14,
                lineHeight: "18px",
                fontWeight: 500,
                color: "white",
              }}
            >
              <CascadeWord text={titleText} />
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Time roller (if showing time) */}
        {active.showTime && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.3 } }}
            className="flex items-center"
            style={{ gap: 4 }}
          >
            <TimeRoller />
            <span
              style={{ fontSize: 14, lineHeight: "18px", color: "rgba(255,255,255,0.64)" }}
            >
              🇦🇺
            </span>
          </motion.div>
        )}

        {/* Arrow button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.55, duration: 0.3 } }}
          className="shrink-0 rounded-full flex items-center justify-center cursor-pointer"
          style={{ ...buttonBg, width: 36, height: 36 }}
        >
          <img src={ARROW_SVG} alt="" style={{ width: 16, height: 16 }} />
        </motion.button>
      </motion.div>
    </div>
  );
}
