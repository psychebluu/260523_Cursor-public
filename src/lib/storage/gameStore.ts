"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameRecord } from "@/lib/types";

type GameStore = {
  games: GameRecord[];
  addGame: (game: Omit<GameRecord, "id">) => void;
  updateGame: (id: string, game: Partial<Omit<GameRecord, "id">>) => void;
  deleteGame: (id: string) => void;
  clearGames: () => void;
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      games: [],
      addGame: (game) =>
        set((state) => ({
          games: [
            {
              ...game,
              id: crypto.randomUUID(),
            },
            ...state.games,
          ],
        })),
      updateGame: (id, game) =>
        set((state) => ({
          games: state.games.map((item) =>
            item.id === id ? { ...item, ...game } : item,
          ),
        })),
      deleteGame: (id) =>
        set((state) => ({
          games: state.games.filter((item) => item.id !== id),
        })),
      clearGames: () => set({ games: [] }),
    }),
    {
      name: "stardew-baseball-games",
    },
  ),
);
