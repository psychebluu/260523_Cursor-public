import { GameFormSheet } from "@/components/games/GameFormSheet";
import { PageTransition } from "@/components/layout/PageTransition";

export default function NewGamePage() {
  return (
    <PageTransition>
      <header className="mb-6">
        <p className="section-title text-xs text-accent">새 기록</p>
        <h1 className="mt-2 text-2xl font-bold">직관 경기 추가</h1>
      </header>
      <GameFormSheet embedded />
    </PageTransition>
  );
}
