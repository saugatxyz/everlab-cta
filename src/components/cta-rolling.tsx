"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, TimePills, FindTimeButton, HeroImage, item } from "./shared";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const conditions = [
  { id: "today", word: "today", label: "Today" },
  { id: "tomorrow", word: "tomorrow", label: "Tomorrow" },
  { id: "next-week", word: "\u00B7 Wed, 15 Apr", label: "Next Week" },
  { id: "later", word: "Apr 28", label: "Later" },
];

const SUBTITLE = "15 min, no commitments  \u00B7  🇦🇺 AEST";
const TITLE_HOLD = 3000;
const SUBTITLE_HOLD = 2200;

// All title words + subtitle for sizing
const allTexts = [
  ...conditions.map((c) => `Book your free discovery call ${c.word}`),
  SUBTITLE,
];

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
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.35,
              delay: i * 0.012,
            },
          }}
          exit={{
            y: -18,
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.25,
              delay: i * 0.008,
            },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────

export function CTARolling({ condition }: { condition: string }) {
  const [showTitle, setShowTitle] = useState(true);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  const activeCondition =
    conditions.find((c) => c.id === condition) ?? conditions[0];
  const titleText = `Book your free discovery call ${activeCondition.word}`;
  const currentText = showTitle ? titleText : SUBTITLE;

  useEffect(() => {
    const entranceDelay = setTimeout(() => {
      setHasEnteredView(true);
    }, 800);
    return () => clearTimeout(entranceDelay);
  }, []);

  useEffect(() => {
    if (!hasEnteredView) return;

    const hold = showTitle ? TITLE_HOLD : SUBTITLE_HOLD;
    const timer = setTimeout(() => {
      setShowTitle((prev) => !prev);
    }, hold);

    return () => clearTimeout(timer);
  }, [showTitle, hasEnteredView]);

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
          <Avatar />
          <motion.div
            variants={item}
            className="relative inline-grid overflow-hidden"
            style={{ height: 20 }}
          >
            {/* Invisible sizers — all possible texts stacked to hold max width */}
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
            {/* Visible animated text */}
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

        <div className="flex items-center" style={{ gap: 4 }}>
          <TimePills />
          <FindTimeButton />
        </div>
      </div>
      <HeroImage />
    </motion.div>
  );
}
