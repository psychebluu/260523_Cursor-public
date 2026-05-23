"use client";

import { formatGameDate } from "@/components/dashboard/RecentGames";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTeamByName } from "@/lib/constants/kboTeams";
import type { GameRecord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

type GameCardProps = {
  game: GameRecord;
  compact?: boolean;
  onDelete?: (id: string) => void;
};

const RESULT_LABEL = {
  win: "승",
  loss: "패",
  draw: "무",
};

const RESULT_CLASS = {
  win: "stardew-card-win bg-stardew-win/10 text-stardew-win",
  loss: "stardew-card-loss bg-stardew-loss/10 text-stardew-loss",
  draw: "stardew-card-draw bg-accent/10 text-accent",
};

export function GameCard({ game, compact = false, onDelete }: GameCardProps) {
  const myTeam = getTeamByName(game.myTeam);
  const opponent = getTeamByName(game.opponent);

  return (
    <div
      className={cn(
        "stardew-card rounded-2xl border border-border/60 p-4",
        game.result === "win" && "stardew-card-win",
        game.result === "loss" && "stardew-card-loss",
        game.result === "draw" && "stardew-card-draw",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: myTeam?.color ?? "#5faf5a" }}
            />
            <p className="truncate font-semibold">
              {game.myTeam} vs {game.opponent}
            </p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatGameDate(game.date)} · {game.isHome ? "홈" : "원정"}
            {!compact && game.stadium ? ` · ${game.stadium}` : ""}
          </p>
          {!compact && game.memo && (
            <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{game.memo}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Badge className={cn("rounded-full px-2.5", RESULT_CLASS[game.result])}>
            {RESULT_LABEL[game.result]}
          </Badge>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(game.id)}
              aria-label="경기 삭제"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {!compact && opponent && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: opponent.color }}
          />
          상대: {game.opponent}
        </div>
      )}
    </div>
  );
}
