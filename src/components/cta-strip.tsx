"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AVATAR_SRC, HERO_SRC } from "./shared";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0, duration: 0.5 },
  },
};

// ─── Conditions ──────────────────────────────────────────────

export const conditions = [
  {
    id: "today",
    label: "Today",
    title: "Book your free discovery call today",
    pills: [
      { day: null, time: "2:30 PM" },
      { day: null, time: "3:15 PM" },
      { day: null, time: "4:20 PM" },
    ],
  },
  {
    id: "mixed",
    label: "Mixed",
    title: "Book your free discovery call",
    pills: [
      { day: "Today", time: "2:30 PM" },
      { day: "15 Mar", time: "3:15 PM" },
      { day: "12 Apr", time: "4:20 PM" },
    ],
  },
];

const SUBTITLE = "15 min, no commitments \u00B7 🇦🇺 AEST";
const TITLE_HOLD = 4000;
const SUBTITLE_HOLD = 2000;

// ─── Character Cascade ───────────────────────────────────────

function splitGraphemes(str: string): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter("en", { granularity: "grapheme" });
    return [...seg.segment(str)].map((s) => s.segment);
  }
  return [...str];
}

function CascadeText({ text }: { text: string }) {
  const chars = splitGraphemes(text);
  return (
    <>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
          animate={{
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { type: "spring", bounce: 0, duration: 0.35, delay: i * 0.012 },
          }}
          exit={{
            y: -18,
            opacity: 0,
            filter: "blur(6px)",
            transition: { type: "spring", bounce: 0, duration: 0.25, delay: i * 0.008 },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

// ─── Strip CTA ───────────────────────────────────────────────

export function CTAStrip({ condition }: { condition: string }) {
  const active = conditions.find((c) => c.id === condition) ?? conditions[0];

  const [showTitle, setShowTitle] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  const currentText = showTitle ? active.title : SUBTITLE;

  // All possible texts for grid sizer
  const allTexts = [...conditions.map((c) => c.title), SUBTITLE];

  useEffect(() => {
    const t = setTimeout(() => setHasEntered(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    const hold = showTitle ? TITLE_HOLD : SUBTITLE_HOLD;
    const t = setTimeout(() => setShowTitle((p) => !p), hold);
    return () => clearTimeout(t);
  }, [showTitle, hasEntered]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-black w-full flex flex-col"
    >
      <div
        className="flex items-center justify-center"
        style={{ padding: "12px 32px", gap: 45 }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          {/* Avatar */}
          <motion.img
            variants={item}
            src={AVATAR_SRC}
            alt=""
            className="shrink-0 object-cover rounded-full"
            style={{ width: 36, height: 36 }}
          />

          {/* Rolling text */}
          <motion.div
            variants={item}
            className="relative inline-grid overflow-hidden"
            style={{ height: 20 }}
          >
            {allTexts.map((t) => (
              <span
                key={t}
                aria-hidden
                className="whitespace-nowrap"
                style={{
                  gridArea: "1 / 1",
                  fontSize: 16,
                  lineHeight: "20px",
                  fontWeight: 500,
                  visibility: "hidden",
                }}
              >
                {t}
              </span>
            ))}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentText}
                className="inline-flex whitespace-nowrap"
                style={{
                  gridArea: "1 / 1",
                  fontSize: 16,
                  lineHeight: "20px",
                  fontWeight: 500,
                  color: "white",
                }}
              >
                <CascadeText text={currentText} />
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Time pills */}
        <div className="flex items-center" style={{ gap: 4 }}>
          {active.pills.map((pill, i) => (
            <motion.div
              key={`${pill.day}-${pill.time}-${i}`}
              variants={item}
              className="flex items-center justify-center shrink-0"
              style={{
                height: 36,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
                border: "1px solid rgba(255,255,255,0.24)",
                borderRadius: 9999,
                gap: 10,
              }}
            >
              {pill.day && (
                <span
                  className="whitespace-nowrap"
                  style={{
                    fontSize: 14,
                    lineHeight: "18px",
                    color: "rgba(255,255,255,0.64)",
                  }}
                >
                  {pill.day}
                </span>
              )}
              <span
                className="whitespace-nowrap"
                style={{ fontSize: 14, lineHeight: "18px", color: "white" }}
              >
                {pill.time}
              </span>
            </motion.div>
          ))}

          {/* Find time button */}
          <motion.button
            variants={item}
            className="flex items-center shrink-0 cursor-pointer hover:bg-white/90 transition-colors duration-200"
            style={{
              height: 36,
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 6,
              paddingBottom: 6,
              borderRadius: 9999,
              background: "white",
              fontSize: 14,
              lineHeight: "18px",
              fontWeight: 500,
              color: "black",
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5.5 1.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M10.5 1.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Find time
          </motion.button>
        </div>
      </div>

      {/* Hero image */}
      <div
        className="w-full relative overflow-hidden"
        style={{ aspectRatio: "1713 / 986", borderRadius: 12 }}
      >
        <img
          src={HERO_SRC}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}
