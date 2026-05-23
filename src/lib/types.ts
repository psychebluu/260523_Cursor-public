export type GameResult = "win" | "loss" | "draw";

export type GameRecord = {
  id: string;
  date: string;
  myTeam: string;
  opponent: string;
  isHome: boolean;
  result: GameResult;
  stadium?: string;
  memo?: string;
};

export type WinRateStats = {
  wins: number;
  losses: number;
  draws: number;
  total: number;
  winRate: number | null;
};

export type StreakInfo = {
  type: "win" | "loss" | "none";
  count: number;
};

export type MonthlyWinRate = {
  month: string;
  label: string;
  wins: number;
  losses: number;
  winRate: number | null;
};
