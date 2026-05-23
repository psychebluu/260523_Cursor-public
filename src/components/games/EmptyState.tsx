"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  title = "아직 직관 기록이 없어요",
  description = "첫 경기를 기록하고 나만의 직관 승률을 확인해볼까요?",
  actionLabel = "첫 경기 기록하기",
  actionHref = "/games/new",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="stardew-card flex flex-col items-center rounded-3xl px-6 py-10 text-center"
    >
      <div className="relative mb-4">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="text-5xl"
        >
          🧑‍🌾
        </motion.div>
        <Sprout className="absolute -right-2 -top-1 h-5 w-5 text-primary" />
      </div>
      <h3 className="section-title text-sm text-accent">{title}</h3>
      <p className="mt-3 max-w-[260px] text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <Link
        href={actionHref}
        className="mt-6 inline-flex h-9 items-center justify-center rounded-2xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {actionLabel}
      </Link>
    </motion.div>
  );
}
