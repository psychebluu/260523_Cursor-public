"use client";

import { useEffect, useMemo, useState } from "react";
import { MonthlyWinRateChart } from "@/components/charts/MonthlyWinRateChart";
import { RecentGames } from "@/components/dashboard/RecentGames";
import { StreakBadge } from "@/components/dashboard/StreakBadge";
import { WinRateHero } from "@/components/dashboard/WinRateHero";
import { EmptyState } from "@/components/games/EmptyState";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { useGameStore } from "@/lib/storage/gameStore";
import {
  calculateStreak,
  calculateWinRate,
  filterGames,
  getMonthlyWinRates,
  getRecentGames,
} from "@/lib/stats/calculateWinRate";

export function DashboardPage() {
  const games = useGameStore((state) => state.games);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();
  const allStats = useMemo(() => calculateWinRate(games), [games]);
  const yearStats = useMemo(
    () => calculateWinRate(filterGames(games, { year: currentYear })),
    [games, currentYear],
  );
  const streak = useMemo(() => calculateStreak(games), [games]);
  const recentGames = useMemo(() => getRecentGames(games), [games]);
  const monthlyData = useMemo(() => getMonthlyWinRates(games), [games]);

  if (!mounted) {
    return <div className="h-40 animate-pulse rounded-3xl bg-secondary/60" />;
  }

  if (games.length === 0) {
    return (
      <PageTransition>
        <header className="mb-6">
          <p className="section-title text-xs text-accent">직관 승률 농장</p>
          <h1 className="mt-2 text-2xl font-bold">오늘도 행운 가득, ⚾</h1>
        </header>
        <EmptyState />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <header className="mb-6">
        <p className="section-title text-xs text-accent">직관 승률 농장</p>
        <h1 className="mt-2 text-2xl font-bold">오늘도 행운 가득, ⚾</h1>
      </header>

      <StaggerContainer className="space-y-4">
        <StaggerItem>
          <WinRateHero
            winRate={allStats.winRate}
            wins={allStats.wins}
            losses={allStats.losses}
            total={allStats.total}
          />
        </StaggerItem>

        <StaggerItem>
          <StreakBadge streak={streak} />
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-2 gap-3">
            <Card className="stardew-card border-none">
              <CardContent className="px-4 py-4">
                <p className="text-xs text-muted-foreground">{currentYear}년 승률</p>
                <p className="mt-2 text-2xl font-bold text-primary">
                  {yearStats.winRate === null ? "-" : `${yearStats.winRate}%`}
                </p>
              </CardContent>
            </Card>
            <Card className="stardew-card border-none">
              <CardContent className="px-4 py-4">
                <p className="text-xs text-muted-foreground">총 직관</p>
                <p className="mt-2 text-2xl font-bold">{allStats.total}경기</p>
              </CardContent>
            </Card>
          </div>
        </StaggerItem>

        <StaggerItem>
          <RecentGames games={recentGames} />
        </StaggerItem>

        <StaggerItem>
          <MonthlyWinRateChart data={monthlyData} />
        </StaggerItem>
      </StaggerContainer>
    </PageTransition>
  );
}
