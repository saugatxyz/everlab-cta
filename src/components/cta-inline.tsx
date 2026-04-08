"use client";

import { motion } from "framer-motion";
import {
  Avatar,
  TimePills,
  FindTimeButton,
  DotSeparator,
  HeroImage,
  item,
} from "./shared";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export function CTAInline() {
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
            className="flex items-center"
            style={{ gap: 12 }}
          >
            <p
              className="font-medium text-white whitespace-nowrap"
              style={{ fontSize: 16, lineHeight: "20px" }}
            >
              Book your free discovery call today
            </p>
            <div className="flex items-center" style={{ gap: 4 }}>
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: 16,
                  lineHeight: "18px",
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                15 min, no commitments
              </span>
              <DotSeparator />
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: 16,
                  lineHeight: "18px",
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                🇦🇺
              </span>
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: 16,
                  lineHeight: "18px",
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                AEST
              </span>
            </div>
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
