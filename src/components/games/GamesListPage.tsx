"use client";

import { useEffect, useMemo, useState } from "react";
import { GameCard } from "@/components/games/GameCard";
import { EmptyState } from "@/components/games/EmptyState";
import { PageTransition } from "@/components/layout/PageTransition";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KBO_TEAMS } from "@/lib/constants/kboTeams";
import { useGameStore } from "@/lib/storage/gameStore";
import { filterGames, getAvailableYears } from "@/lib/stats/calculateWinRate";

export function GamesListPage() {
  const games = useGameStore((state) => state.games);
  const deleteGame = useGameStore((state) => state.deleteGame);
  const [mounted, setMounted] = useState(false);
  const [teamFilter, setTeamFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  const years = useMemo(() => getAvailableYears(games), [games]);

  const filteredGames = useMemo(() => {
    return filterGames(games, {
      myTeam: teamFilter === "all" ? undefined : teamFilter,
      year: yearFilter === "all" ? undefined : Number(yearFilter),
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [games, teamFilter, yearFilter]);

  if (!mounted) {
    return <div className="h-40 animate-pulse rounded-3xl bg-secondary/60" />;
  }

  return (
    <PageTransition>
      <header className="mb-6">
        <p className="section-title text-xs text-accent">직관 일지</p>
        <h1 className="mt-2 text-2xl font-bold">나의 경기 기록</h1>
      </header>

      {games.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="stardew-card mb-4 grid grid-cols-2 gap-3 rounded-3xl p-4">
            <div className="space-y-2">
              <Label>팀 필터</Label>
              <Select value={teamFilter} onValueChange={(value) => value && setTeamFilter(value)}>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 팀</SelectItem>
                  {KBO_TEAMS.map((team) => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>연도 필터</Label>
              <Select value={yearFilter} onValueChange={(value) => value && setYearFilter(value)}>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 연도</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}년
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredGames.length === 0 ? (
              <div className="rounded-3xl bg-secondary/50 px-4 py-10 text-center text-sm text-muted-foreground">
                선택한 조건의 기록이 없어요
              </div>
            ) : (
              filteredGames.map((game) => (
                <GameCard key={game.id} game={game} onDelete={deleteGame} />
              ))
            )}
          </div>
        </>
      )}
    </PageTransition>
  );
}
