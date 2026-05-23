"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronRight } from "lucide-react";
import { GameCard } from "@/components/games/GameCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GameRecord } from "@/lib/types";

type RecentGamesProps = {
  games: GameRecord[];
};

export function RecentGames({ games }: RecentGamesProps) {
  return (
    <Card className="stardew-card border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="section-title text-sm text-accent">최근 직관</CardTitle>
        {games.length > 0 && (
          <Link
            href="/games"
            className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            전체 보기
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {games.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            아직 직관 기록이 없어요
          </p>
        ) : (
          games.map((game) => (
            <GameCard key={game.id} game={game} compact />
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function formatGameDate(date: string) {
  return format(parseISO(date), "yyyy.MM.dd (EEE)", { locale: ko });
}
