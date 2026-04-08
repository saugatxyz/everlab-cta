"use client";

import { DialRoot } from "dialkit";
import "dialkit/styles.css";

export default function FloatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <DialRoot position="top-right" defaultOpen />
    </>
  );
}
