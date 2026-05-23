"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { KBO_TEAMS, getOpponentTeams } from "@/lib/constants/kboTeams";
import { useGameStore } from "@/lib/storage/gameStore";
import type { GameResult } from "@/lib/types";

type GameFormSheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
};

export function GameFormSheet({
  open = true,
  onOpenChange,
  embedded = false,
}: GameFormSheetProps) {
  const router = useRouter();
  const addGame = useGameStore((state) => state.addGame);

  const [myTeam, setMyTeam] = useState(KBO_TEAMS[0].name);
  const [opponent, setOpponent] = useState(getOpponentTeams(KBO_TEAMS[0].name)[0].name);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [isHome, setIsHome] = useState<"home" | "away">("home");
  const [result, setResult] = useState<GameResult>("win");
  const [stadium, setStadium] = useState(KBO_TEAMS[0].stadium);
  const [memo, setMemo] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const opponents = useMemo(() => getOpponentTeams(myTeam), [myTeam]);

  const handleTeamChange = (teamName: string | null) => {
    if (!teamName) return;
    setMyTeam(teamName);
    const team = KBO_TEAMS.find((item) => item.name === teamName);
    const nextOpponents = getOpponentTeams(teamName);
    setOpponent(nextOpponents[0]?.name ?? "");
    if (team) {
      setStadium(team.stadium);
    }
  };

  const resetForm = () => {
    setMyTeam(KBO_TEAMS[0].name);
    setOpponent(getOpponentTeams(KBO_TEAMS[0].name)[0].name);
    setDate(format(new Date(), "yyyy-MM-dd"));
    setIsHome("home");
    setResult("win");
    setStadium(KBO_TEAMS[0].stadium);
    setMemo("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addGame({
      date,
      myTeam,
      opponent,
      isHome: isHome === "home",
      result,
      stadium: stadium || undefined,
      memo: memo || undefined,
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
      if (embedded) {
        router.push("/");
      } else {
        onOpenChange?.(false);
        router.push("/games");
      }
    }, 900);
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="myTeam">응원 팀</Label>
        <Select value={myTeam} onValueChange={handleTeamChange}>
          <SelectTrigger id="myTeam" className="w-full rounded-2xl">
            <SelectValue placeholder="팀 선택" />
          </SelectTrigger>
          <SelectContent>
            {KBO_TEAMS.map((team) => (
              <SelectItem key={team.id} value={team.name}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="opponent">상대 팀</Label>
        <Select value={opponent} onValueChange={(value) => value && setOpponent(value)}>
          <SelectTrigger id="opponent" className="w-full rounded-2xl">
            <SelectValue placeholder="상대 팀 선택" />
          </SelectTrigger>
          <SelectContent>
            {opponents.map((team) => (
              <SelectItem key={team.id} value={team.name}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="date">경기 날짜</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="rounded-2xl"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">홈/원정</Label>
          <Select
            value={isHome}
            onValueChange={(value) => value && setIsHome(value as "home" | "away")}
          >
            <SelectTrigger id="location" className="w-full rounded-2xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">홈</SelectItem>
              <SelectItem value="away">원정</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>경기 결과</Label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: "win", label: "승리" },
            { value: "loss", label: "패배" },
            { value: "draw", label: "무승부" },
          ] as const).map((item) => (
            <Button
              key={item.value}
              type="button"
              variant={result === item.value ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setResult(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stadium">구장 (선택)</Label>
        <Input
          id="stadium"
          value={stadium}
          onChange={(event) => setStadium(event.target.value)}
          placeholder="예: 잠실야구장"
          className="rounded-2xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="memo">직관 메모 (선택)</Label>
        <Input
          id="memo"
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          placeholder="예: 9회말 역전승!"
          className="rounded-2xl"
        />
      </div>

      <Button type="submit" className="h-12 w-full rounded-2xl text-base">
        기록 저장하기
      </Button>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary/15 py-3 text-sm font-medium text-primary"
        >
          <span>✨</span>
          기록이 저장됐어요!
          <span>🌿</span>
        </motion.div>
      )}
    </form>
  );

  if (embedded) {
    return (
      <div className="stardew-card rounded-3xl p-5">
        <div className="mb-5">
          <h2 className="section-title text-sm text-accent">새 직관 기록</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            직관한 경기 정보를 입력하면 승률에 반영돼요.
          </p>
        </div>
        {form}
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[92dvh] max-w-[480px] rounded-t-[28px]">
        <SheetHeader>
          <SheetTitle className="section-title text-sm text-accent">새 직관 기록</SheetTitle>
          <SheetDescription>
            직관한 경기 정보를 입력하면 승률에 반영돼요.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-1 pb-6 pt-2">{form}</div>
      </SheetContent>
    </Sheet>
  );
}
