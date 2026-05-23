"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthlyWinRate } from "@/lib/types";

type MonthlyWinRateChartProps = {
  data: MonthlyWinRate[];
};

export function MonthlyWinRateChart({ data }: MonthlyWinRateChartProps) {
  return (
    <Card className="stardew-card border-none">
      <CardHeader>
        <CardTitle className="section-title text-sm text-accent">월별 직관 승률</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            차트를 그릴 데이터가 아직 없어요
          </div>
        ) : (
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7c9b0" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#6d4c41", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#6d4c41", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(95, 175, 90, 0.08)" }}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #d7c9b0",
                    background: "#fffaf0",
                    color: "#3e2723",
                  }}
                  formatter={(value) => [`${value ?? 0}%`, "승률"]}
                />
                <Bar
                  dataKey="winRate"
                  fill="#5faf5a"
                  radius={[10, 10, 4, 4]}
                  maxBarSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
