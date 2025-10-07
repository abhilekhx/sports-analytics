import { z } from "zod";

export const PlayerMetricZ = z.object({
  playerId: z.string(),
  matchId: z.string(),
  distanceKm: z.number(),
  topSpeedKmh: z.number(),
  highIntensityRuns: z.number(),
  minutesPlayed: z.number(),
});
export const MetricsResponseZ = z.object({
  matchId: z.string(),
  players: z.array(PlayerMetricZ),
});
export type MetricsResponse = z.infer<typeof MetricsResponseZ>;
