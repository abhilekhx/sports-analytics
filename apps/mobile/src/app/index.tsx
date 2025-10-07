import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from "expo-constants";

type PlayerMetric = {
  playerId: string;
  matchId: string;
  distanceKm: number;
  topSpeedKmh: number;
  highIntensityRuns: number;
  minutesPlayed: number;
};
type MetricsResponse = { matchId: string; players: PlayerMetric[] };
const API_BASE = (Constants.expoConfig?.extra as any)?.API_BASE as string;

export default function Home() {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const url = `${API_BASE}/api/metrics`
  console.log("URL",url)
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).catch(console.error);
  }, []);

  console.log("DATA",data)
  if (data) return (
      <View style={styles.container}>
        <Text>Match {data.matchId}</Text>
        {data.players.map(p => (
        <Text key={p.playerId}>{p.playerId}: {p.distanceKm.toFixed(1)} km</Text>
      ))}
        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbfbff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
