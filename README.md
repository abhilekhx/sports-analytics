# sports-analytics — workspace map & wiring

sports-analytics/<br>
├─ apps/
│ ├─ web/ # Next.js app (also hosts API routes)
│ │ └─ src/app/
│ │ ├─ api/metrics/route.ts ← GET /api/metrics (mock data + Zod validation)
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ ├─ globals.css
│ │ └─ fonts/...
│ │ └─ package.json ← "web" app scripts/deps
│ │ └─ next.config.js ← Next config (currently minimal)
│ │
│ └─ mobile/ # Expo (React Native) app
│ ├─ index.ts ← **ENTRY** (should boot the router)
│ ├─ app.json ← Expo config; router plugin; API_BASE in `extra`
│ ├─ babel.config.js ← adds "expo-router/babel" plugin
│ ├─ tsconfig.json
│ ├─ App.tsx ← (leftover from template; not used with Router)
│ └─ src/app/
│ ├─ \_layout.tsx ← Expo Router layout (Stack header)
│ └─ index.tsx ← Home screen (fetches /api/metrics)
│
├─ packages/
│ ├─ types/
│ │ ├─ package.json ← name: "@playerai/types"
│ │ └─ src/index.ts ← shared TS types (e.g., PlayerMetric)
│ │
│ ├─ validation/
│ │ ├─ package.json ← name: "@playerai/validation" + zod dep
│ │ └─ src/index.ts ← Zod schemas + inferred types
│ │
│ ├─ ui/ ← shared React components (web now; RN later)
│ │ ├─ package.json ← name: "@playerai/ui"
│ │ └─ src/_ ← components (exports via "exports": "./src/_.tsx")
│ │
│ ├─ eslint-config/ ← internal lint presets
│ └─ typescript-config/ ← internal tsconfig presets
│
├─ package.json ← monorepo root (workspaces, turbo scripts)
├─ turbo.json ← turborepo pipeline (cache/run dev/build/lint)
└─ pnpm-workspace.yaml ← (implicit via root package.json workspaces)

what each important file is doing
web (Next.js)

apps/web/src/app/api/metrics/route.ts
A server route (App Router). Returns mock data and validates it:

import { MetricsResponseZ, PlayerMetricZ } from "@playerai/validation";
// build an array of PlayerMetric and validate:
const players = PlayerMetricZ.array().parse([...]);
return NextResponse.json(MetricsResponseZ.parse({ matchId: "m1", players }));

Why this matters: your API responses are runtime-checked (Zod), and the same shapes are importable from web + mobile.

apps/web/src/app/page.tsx
The homepage; can fetch from /api/metrics and render a simple table (you already had this earlier).

apps/web/package.json
Declares dependencies on your internal packages:

{
"dependencies": {
"@playerai/types": "workspace:_",
"@playerai/validation": "workspace:_",
"@playerai/ui": "workspace:\*",
"next": "^15.5.0", "react": "^19.1.0", "react-dom": "^19.1.0"
}
}

apps/web/next.config.js
Currently empty. If you start importing code from packages that need transpiling, add:

const nextConfig = { transpilePackages: ["@playerai/ui", "@playerai/types", "@playerai/validation"] };
export default nextConfig;

mobile (Expo + Expo Router)

apps/mobile/app.json

Enables Expo Router and points it to your src/app tree:

"plugins": [["expo-router", { "origin": "src/app" }]]

Holds your API base URL in extra (use your LAN IP):

"extra": { "API_BASE": "http://10.0.0.172:3000" }

apps/mobile/babel.config.js
Adds the Router plugin:

plugins: ['expo-router/babel']

apps/mobile/index.ts ❗️ENTRY
Right now your zip shows both router + manual boot:

import { registerRootComponent } from "expo";
import Home from "./src/app/index";
import "expo-router/entry";
import App from "./App";
registerRootComponent(Home);

👉 For Expo Router, make this only:

import "expo-router/entry";

And either delete/rename App.tsx, or just leave it unused.

apps/mobile/src/app/\_layout.tsx
Minimal router stack header:

import { Stack } from "expo-router";
export default function RootLayout() {
return <Stack screenOptions={{ headerTitle: "PlayerAI" }} />;
}

apps/mobile/src/app/index.tsx
Fetches your metrics and renders a list. It reads API_BASE from app.json:

const API_BASE = (Constants.expoConfig?.extra as any)?.API_BASE as string;
fetch(`${API_BASE}/api/metrics`).then(r => r.json()).then(setData);

shared packages

packages/types/src/index.ts
Pure TypeScript types you can import anywhere.

packages/validation/src/index.ts
Zod schemas:

export const PlayerMetricZ = z.object({ ... });
export const MetricsResponseZ = z.object({ matchId: z.string(), players: z.array(PlayerMetricZ) });
export type MetricsResponse = z.infer<typeof MetricsResponseZ>;

packages/ui
Web UI components (React). Importable by web; later you can add a ui-native for RN or keep them separate.

how everything is wired together

Workspaces: Root package.json declares "workspaces": ["apps/*", "packages/*", "services/*"].
Running pnpm install links all local packages so imports like @playerai/validation resolve to your source folders.

Turborepo: Root scripts.dev = "turbo run dev".
Running pnpm dev launches every workspace that has a "dev" script (e.g., web, docs).
You can start mobile separately with pnpm --filter mobile start.

Data flow (today):

Mobile (Expo) ──fetch──> Web API (Next.js /api/metrics) ──Zod validate──> JSON
^
│
Shared types/schemas in packages

Networking: mobile calls API_BASE you set in app.json. Use your Wi-Fi IPv4 (often 10.x or 192.168.x). Ignore WSL/VPN addresses (172.x) — your phone can’t reach them.

current issues / quick fixes

Expo entry conflict
Your apps/mobile/index.ts currently mixes router + manual root.
👉 Change it to:

import "expo-router/entry";

Then pnpm --filter mobile start -- --clear.

Leftover App.tsx
Not harmful, but confusing. Consider renaming it to \_App_unused.tsx.

Ports
Web runs on 3000 (next dev --port 3000). If you also run docs, give it 3001 to avoid clashes.

daily commands

Install & link workspaces

pnpm install
pnpm list -r # verify @playerai/types, @playerai/validation, etc.

Run everything (web + docs)

pnpm dev

Run just web

pnpm --filter web dev

Run mobile

pnpm --filter mobile start # LAN mode
pnpm --filter mobile start -- --tunnel # if LAN/VPN is painful
