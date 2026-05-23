"use client";

import { motion } from "framer-motion";
import { Flame, Leaf, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StreakInfo } from "@/lib/types";

type StreakBadgeProps = {
  streak: StreakInfo;
};

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak.type === "none" || streak.count === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="stardew-card rounded-3xl px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-secondary p-2">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">첫 직관을 기록해보세요</p>
            <p className="text-xs text-muted-foreground">연승/연패 배지가 여기에 표시돼요</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const isWin = streak.type === "win";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="stardew-card rounded-3xl px-4 py-3"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-2xl p-2 ${isWin ? "bg-stardew-win/15" : "bg-stardew-loss/15"}`}
          >
            {isWin ? (
              <Sparkles className="h-5 w-5 text-stardew-win" />
            ) : (
              <Flame className="h-5 w-5 text-stardew-loss" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {isWin ? "행운의 직관 연승!" : "아쉬운 직관 연패..."}
            </p>
            <p className="text-xs text-muted-foreground">
              최근 {streak.count}경기 연속 {isWin ? "승리" : "패배"}
            </p>
          </div>
        </div>
        <Badge
          className={`rounded-full px-3 py-1 text-sm ${
            isWin
              ? "bg-stardew-win text-white hover:bg-stardew-win/90"
              : "bg-stardew-loss text-white hover:bg-stardew-loss/90"
          }`}
        >
          {streak.count}연{isWin ? "승" : "패"}
        </Badge>
      </div>
    </motion.div>
  );
}
