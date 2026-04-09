"use client";

import { motion } from "framer-motion";
import { AVATAR1_SRC, ARROW_SVG } from "./shared";

export function FloatingSimple({
  material = "black",
}: {
  material?: "black" | "glass";
}) {
  const bgStyle =
    material === "glass"
      ? { background: "rgba(0,0,0,0.16)", backdropFilter: "blur(128px)", WebkitBackdropFilter: "blur(128px)" }
      : { background: "black" };

  const buttonBg =
    material === "glass"
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
        style={{ ...bgStyle, padding: "4px 6px 4px 4px", gap: 17 }}
      >
        {/* Avatar */}
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.3 } }}
          src={AVATAR1_SRC}
          alt=""
          className="rounded-full shrink-0 object-cover"
          style={{ width: 40, height: 40 }}
        />

        {/* Text */}
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.45, duration: 0.3 } }}
          className="whitespace-nowrap"
          style={{ fontSize: 14, lineHeight: "18px", fontWeight: 500, color: "white" }}
        >
          Book your discovery call
        </motion.span>

        {/* Arrow button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.3 } }}
          className="shrink-0 rounded-full flex items-center justify-center cursor-pointer"
          style={{ ...buttonBg, width: 36, height: 36 }}
        >
          <img src={ARROW_SVG} alt="" style={{ width: 16, height: 16 }} />
        </motion.button>
      </motion.div>
    </div>
  );
}
