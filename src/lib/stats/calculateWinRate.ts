import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import type { GameRecord, MonthlyWinRate, StreakInfo, WinRateStats } from "@/lib/types";

export function filterGames(
  games: GameRecord[],
  options?: {
    year?: number;
    myTeam?: string;
    isHome?: boolean;
    stadium?: string;
  },
): GameRecord[] {
  return games.filter((game) => {
    if (options?.year && parseISO(game.date).getFullYear() !== options.year) {
      return false;
    }
    if (options?.myTeam && game.myTeam !== options.myTeam) {
      return false;
    }
    if (options?.isHome !== undefined && game.isHome !== options.isHome) {
      return false;
    }
    if (options?.stadium && game.stadium !== options.stadium) {
      return false;
    }
    return true;
  });
}

export function calculateWinRate(games: GameRecord[]): WinRateStats {
  const wins = games.filter((game) => game.result === "win").length;
  const losses = games.filter((game) => game.result === "loss").length;
  const draws = games.filter((game) => game.result === "draw").length;
  const total = wins + losses;

  return {
    wins,
    losses,
    draws,
    total: games.length,
    winRate: total > 0 ? Math.round((wins / total) * 1000) / 10 : null,
  };
}

export function calculateStreak(games: GameRecord[]): StreakInfo {
  const sorted = [...games]
    .filter((game) => game.result !== "draw")
    .sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    return { type: "none", count: 0 };
  }

  const firstResult = sorted[0].result as "win" | "loss";
  let count = 0;

  for (const game of sorted) {
    if (game.result === firstResult) {
      count += 1;
    } else {
      break;
    }
  }

  return { type: firstResult, count };
}

export function getRecentGames(games: GameRecord[], limit = 5): GameRecord[] {
  return [...games].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function getMonthlyWinRates(games: GameRecord[]): MonthlyWinRate[] {
  const grouped = new Map<string, GameRecord[]>();

  for (const game of games) {
    const monthKey = format(parseISO(game.date), "yyyy-MM");
    const existing = grouped.get(monthKey) ?? [];
    existing.push(game);
    grouped.set(monthKey, existing);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, monthGames]) => {
      const stats = calculateWinRate(monthGames);
      return {
        month,
        label: format(parseISO(`${month}-01`), "M월", { locale: ko }),
        wins: stats.wins,
        losses: stats.losses,
        winRate: stats.winRate,
      };
    });
}

export function getAvailableYears(games: GameRecord[]): number[] {
  const years = new Set(games.map((game) => parseISO(game.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
}
