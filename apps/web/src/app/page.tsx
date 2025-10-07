type PlayerMetric = {
  playerId: string;
  matchId: string;
  distanceKm: number;
  topSpeedKmh: number;
  highIntensityRuns: number;
  minutesPlayed: number;
};

async function getMetrics() {
  const res = await fetch("http://localhost:3000/api/metrics", { cache: "no-store" });
  console.log("res---------------",res.body)
  if (!res.ok) throw new Error("Failed to load metrics");
  return res.json() as Promise<{ matchId: string; players: PlayerMetric[] }>;
}

export default async function Home() {
  const { matchId, players } = await getMetrics();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Match {matchId} — Player Metrics</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[440px] border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left border-b">Player</th>
              <th className="p-2 text-right border-b">Distance (km)</th>
              <th className="p-2 text-right border-b">Top speed (km/h)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.playerId} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{p.playerId}</td>
                <td className="p-2 text-right">{p.distanceKm.toFixed(1)}</td>
                <td className="p-2 text-right">{p.topSpeedKmh.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-3">Datas from <code>/api/metrics</code>.</p>
    </main>
  );
}