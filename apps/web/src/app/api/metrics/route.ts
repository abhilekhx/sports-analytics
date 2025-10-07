import { NextResponse } from "next/server";
import { MetricsResponseZ, PlayerMetricZ } from "@playerai/validation";

export async function GET() {
  const players = PlayerMetricZ.array().parse([
    {
      playerId: "p1",
      matchId: "m2",
      distanceKm: 7.2,
      topSpeedKmh: 28.3,
      highIntensityRuns: 7,
      minutesPlayed: 74,
    },
    {
      playerId: "p2",
      matchId: "m1",
      distanceKm: 9.1,
      topSpeedKmh: 30.1,
      highIntensityRuns: 10,
      minutesPlayed: 90,
    },
  ]);
  return NextResponse.json(MetricsResponseZ.parse({ matchId: "m1", players }));
}
