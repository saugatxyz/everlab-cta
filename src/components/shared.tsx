"use client";

import { motion } from "framer-motion";

// Figma asset URLs
export const AVATAR_SRC =
  "http://localhost:3845/assets/8c2658edb3a43140012c06dd2da6363e2a1c0539.png";
export const HERO_SRC =
  "http://localhost:3845/assets/3c4b34795785cdd555afac24d8cd5ff02d166975.png";
export const DOT_SVG =
  "http://localhost:3845/assets/ff4cabf5e47aa4c159b1a614f91138d9acf70483.svg";
// Australian flag emoji as Twemoji image
export const AU_FLAG_SRC =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1e6-1f1fa.svg";

export function AUFlag({ size = 14 }: { size?: number }) {
  return (
    <img
      src={AU_FLAG_SRC}
      alt="AU"
      className="inline-block shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

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

export function Avatar() {
  return (
    <motion.img
      variants={item}
      src={AVATAR_SRC}
      alt=""
      className="shrink-0 object-cover rounded-full"
      style={{ width: 36, height: 36 }}
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
