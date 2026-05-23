"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type WinRateHeroProps = {
  winRate: number | null;
  wins: number;
  losses: number;
  total: number;
};

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 18 });
  const display = useTransform(spring, (current) => Math.round(current * 10) / 10);
  const [text, setText] = useState("0");

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on("change", (latest) => {
      setText(latest.toFixed(latest % 1 === 0 ? 0 : 1));
    });
    return unsubscribe;
  }, [display, spring, value]);

  return <span>{text}</span>;
}

export function WinRateHero({ winRate, wins, losses, total }: WinRateHeroProps) {
  return (
    <Card className="stardew-card overflow-hidden border-none">
      <CardContent className="relative px-6 py-8">
        <div className="absolute right-4 top-4 text-3xl opacity-80">⚾</div>
        <p className="section-title text-xs text-accent">직관 승률 농장</p>
        <div className="mt-4 flex items-end gap-2">
          {winRate === null ? (
            <p className="text-5xl font-bold tracking-tight text-muted-foreground">-</p>
          ) : (
            <>
              <motion.p
                className="text-6xl font-bold tracking-tight text-primary"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <AnimatedNumber value={winRate} />
              </motion.p>
              <span className="mb-2 text-2xl font-semibold text-primary">%</span>
            </>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {total === 0
            ? "아직 기록된 직관 경기가 없어요"
            : `${wins}승 ${losses}패 · 총 ${total}경기 직관`}
        </p>
      </CardContent>
    </Card>
  );
}
