"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useDialKit } from "dialkit";
import { AVATAR_SRC, HERO_SRC } from "@/components/shared";

// DialKit spring configs need casting to framer-motion's Transition type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asTransition = (config: any): Transition => config as Transition;

const ARROW_ICON =
  "http://localhost:3845/assets/15254c4835b19a972a9ca9f74a642d6ed33220d2.svg";

export default function FloatingPage() {
  const [phase, setPhase] = useState<"avatar" | "full">("avatar");

  // ─── DialKit: every setting exposed ────────────────────────

  const p = useDialKit("Floating CTA", {
    timing: {
      expandDelay: [0, 0, 3000, 50],
    },
    avatar: {
      size: [48, 24, 72],
      expandedSize: [40, 24, 56],
      initialScale: [0.3, 0, 1, 0.05],
      entrySpring: {
        type: "spring" as const,
        visualDuration: 0.5,
        bounce: 0.4,
      },
    },
    container: {
      layoutSpring: {
        type: "spring" as const,
        visualDuration: 0.6,
        bounce: 0.35,
      },
      paddingY: [4, 0, 16],
      paddingLeft: [4, 0, 16],
      paddingRight: [6, 0, 16],
      gap: [12, 0, 32],
      blur: [128, 0, 256],
      bgOpacity: [0.16, 0, 1, 0.01],
    },
    text: {
      delay: [0.2, 0, 1, 0.01],
      duration: [0.25, 0.05, 1, 0.01],
      fontSize: [14, 10, 24],
    },
    arrow: {
      size: [36, 24, 56],
      iconSize: [12, 8, 32],
      delay: [0.35, 0, 1, 0.01],
      spring: {
        type: "spring" as const,
        visualDuration: 0.4,
        bounce: 0.4,
      },
      bgOpacity: [0.9, 0, 1, 0.01],
    },
    position: {
      bottom: [48, 0, 120],
    },
    replay: { type: "action" as const },
  }, {
    onAction: (path) => {
      if (path === "replay") {
        setPhase("avatar");
        setTimeout(() => setPhase("full"), p.timing.expandDelay);
      }
    },
  });

  // Serialize key values to detect any change
  const configKey = JSON.stringify({
    td: p.timing.expandDelay,
    as: p.avatar.size,
    ae: p.avatar.expandedSize,
    ai: p.avatar.initialScale,
    aes: p.avatar.entrySpring,
    cls: p.container.layoutSpring,
    cp: [p.container.paddingY, p.container.paddingLeft, p.container.paddingRight],
    cg: p.container.gap,
    cb: p.container.blur,
    co: p.container.bgOpacity,
    ttd: p.text.delay,
    tdu: p.text.duration,
    tf: p.text.fontSize,
    ars: p.arrow.size,
    ari: p.arrow.iconSize,
    ard: p.arrow.delay,
    arsp: p.arrow.spring,
    aro: p.arrow.bgOpacity,
    pb: p.position.bottom,
  });

  const [animKey, setAnimKey] = useState(0);
  const prevConfig = useRef(configKey);

  useEffect(() => {
    if (prevConfig.current !== configKey) {
      prevConfig.current = configKey;
      setPhase("avatar");
      setAnimKey((k) => k + 1);
    }
  }, [configKey]);

  useEffect(() => {
    const t = setTimeout(() => setPhase("full"), p.timing.expandDelay);
    return () => clearTimeout(t);
  }, [animKey]);

  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Hero background */}
      <div className="w-full h-screen relative">
        <img
          src={HERO_SRC}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Floating glass pill */}
      <div
        key={animKey}
        className="fixed z-50 flex justify-center"
        style={{ bottom: p.position.bottom, left: 0, right: 0 }}
      >
        <motion.div
          layout
          transition={asTransition(p.container.layoutSpring)}
          className="flex items-center overflow-hidden"
          style={{
            background: `rgba(0,0,0,${p.container.bgOpacity})`,
            backdropFilter: `blur(${p.container.blur}px)`,
            WebkitBackdropFilter: `blur(${p.container.blur}px)`,
            borderRadius: 9999,
            padding:
              phase === "avatar"
                ? 0
                : `${p.container.paddingY}px ${p.container.paddingRight}px ${p.container.paddingY}px ${p.container.paddingLeft}px`,
            gap: phase === "avatar" ? 0 : p.container.gap,
          }}
        >
          {/* Avatar */}
          <motion.img
            layout
            src={AVATAR_SRC}
            alt=""
            className="shrink-0 object-cover"
            initial={{ scale: p.avatar.initialScale, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={asTransition(p.avatar.entrySpring)}
            style={{
              width: phase === "avatar" ? p.avatar.size : p.avatar.expandedSize,
              height: phase === "avatar" ? p.avatar.size : p.avatar.expandedSize,
              borderRadius: 9999,
            }}
          />

          {/* Text */}
          <AnimatePresence>
            {phase === "full" && (
              <motion.span
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    delay: p.text.delay,
                    duration: p.text.duration,
                  },
                }}
                className="whitespace-nowrap"
                style={{
                  fontSize: p.text.fontSize,
                  lineHeight: "18px",
                  fontWeight: 500,
                  color: "white",
                }}
              >
                Book your discovery call
              </motion.span>
            )}
          </AnimatePresence>

          {/* Arrow button */}
          <AnimatePresence>
            {phase === "full" && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  ...asTransition(p.arrow.spring),
                  delay: p.arrow.delay,
                }}
                className="shrink-0 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: `rgba(255,255,255,${p.arrow.bgOpacity})`,
                  backdropFilter: `blur(${p.container.blur}px)`,
                  width: p.arrow.size,
                  height: p.arrow.size,
                }}
              >
                <img
                  src={ARROW_ICON}
                  alt=""
                  style={{
                    width: p.arrow.iconSize,
                    height: p.arrow.iconSize,
                  }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
