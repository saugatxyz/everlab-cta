"use client";

import { motion } from "framer-motion";

// Asset paths (served from /public)
export const AVATAR1_SRC = "/assets/avatar1.png";
export const AVATAR2_SRC = "/assets/avatar2.png";
export const HERO_SRC = "/assets/hero.webp";
export const DOT_SVG = "/assets/dot.svg";
export const ARROW_SVG = "/assets/arrow.svg";

export const item = {
  hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      bounce: 0,
      duration: 0.5,
    },
  },
};

export function Avatars({ size = 36 }: { size?: number }) {
  const overlap = Math.round(size * 0.22);
  return (
    <motion.div
      variants={item}
      className="flex items-center shrink-0"
      style={{ paddingRight: 8 }}
    >
      <img
        src={AVATAR1_SRC}
        alt=""
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size, border: "2px solid black", zIndex: 1 }}
      />
      <img
        src={AVATAR2_SRC}
        alt=""
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size, marginLeft: -overlap }}
      />
    </motion.div>
  );
}

export function GreenDot() {
  return (
    <img
      src={DOT_SVG}
      alt=""
      className="shrink-0"
      style={{ width: 8, height: 8 }}
    />
  );
}

export function DotSeparator() {
  return (
    <span
      className="shrink-0 rounded-full"
      style={{
        width: 3,
        height: 3,
        background: "rgba(255,255,255,0.64)",
        display: "inline-block",
      }}
    />
  );
}

export function TimePills() {
  const times = ["2:30 PM", "3:15 PM", "4:20 PM"];
  return (
    <>
      {times.map((time) => (
        <motion.div
          key={time}
          variants={item}
          style={{
            height: 36,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
            border: "1px solid rgba(255,255,255,0.24)",
            borderRadius: 9999,
          }}
          className="flex items-center justify-center shrink-0"
        >
          <span
            className="text-white whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: "18px" }}
          >
            {time}
          </span>
        </motion.div>
      ))}
    </>
  );
}

export function FindTimeButton() {
  return (
    <motion.button
      variants={item}
      style={{
        height: 36,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 9999,
        fontSize: 14,
        lineHeight: "18px",
        gap: 8,
      }}
      className="bg-white text-black font-medium flex items-center shrink-0 cursor-pointer hover:bg-white/90 transition-colors duration-200"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0"
      >
        <rect
          x="2"
          y="3"
          width="12"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M5.5 1.5V3.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10.5 1.5V3.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      Find time
    </motion.button>
  );
}

export function HeroImage() {
  return (
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
  );
}
