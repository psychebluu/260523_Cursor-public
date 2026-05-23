"use client";

import { BottomNav } from "@/components/layout/BottomNav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col">
      <main className="flex-1 px-4 pb-28 pt-6">{children}</main>
      <BottomNav />
    </div>
  );
}
