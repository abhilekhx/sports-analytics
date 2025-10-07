# ⚽️ Sports Analytics Monorepo

A **modern, modular monorepo** for building a complete sports analytics platform — combining **web**, **mobile**, and **shared TypeScript packages** for seamless cross-platform development.

---

## 🚀 Tech Stack

| Layer | Technology | Description |
|:------|:------------|:-------------|
| 🖥️ Web App | [Next.js](https://nextjs.org/) | Web interface for dashboards and analytics |
| 📱 Mobile App | [Expo (React Native)](https://expo.dev/) | Cross-platform app for on-field tracking |
| 🧠 Shared Logic | [TypeScript](https://www.typescriptlang.org/) | Shared types, validation, and configs |
| 🧩 Monorepo Engine | [Turborepo](https://turbo.build/repo) | High-performance build orchestration |
| 📦 Package Manager | [PNPM](https://pnpm.io/) | Efficient workspace and dependency manager |

---

## 🗂️ Repository Structure

---

sports-analytics/ <br>
├── apps/ <br>
│ ├── web/ # Next.js web app (frontend) <br>
│ ├── mobile/ # Expo mobile app <br>
│ └── docs/ # Documentation site <br>
│ <br>
├── packages/ <br>
│ ├── types/ # Shared TypeScript types <br>
│ ├── ui/ # Shared React UI components <br>
│ ├── validation/ # Zod schemas and validators <br>
│ ├── eslint-config/ # Shared linting rules <br>
│ └── tsconfig/ # Shared TS configs <br>
│ <br>
├── turbo.json # Turborepo pipeline config <br>
├── pnpm-workspace.yaml # Workspace definitions <br>
└── package.json # Root scripts and dependencies <br>
 <br>
 
---


---

## 🧠 Getting Started

### 1️⃣ Install dependencies

Make sure you have **Node.js ≥ 18**, **PNPM**, and **Turborepo** installed.

```bash
pnpm install
```

### 2️⃣ Run all development servers

Launch all apps (web, mobile, docs) simultaneously:

```bash
pnpm dev
```

### 3️⃣ Run individual apps
#### Web (Next.js)
```bash
cd apps/web && pnpm dev
```

#### Mobile (Expo)
```bash
cd apps/mobile && pnpm start
```

#### Docs
```bash
cd apps/docs && pnpm dev
```


## 🧩 Shared Packages

Each package inside /packages is designed for reuse across apps:

- @playerai/types — shared data models (Player, Match, Metrics)
- @playerai/validation — Zod-based validation schemas
- @playerai/ui — future shared React components
- @playerai/tsconfig — shared TypeScript base config

## 🧪 Example API (Web)

The Next.js app exposes simple player metric APIs like:

// apps/web/app/api/metrics/route.ts
export async function GET() {
  const players = [
    { playerId: "p1", distanceKm: 7.2, topSpeedKmh: 28.3 },
    { playerId: "p2", distanceKm: 9.1, topSpeedKmh: 30.1 },
  ];
  return NextResponse.json({ matchId: "m1", players });
}

## ⚙️ Scripts

Command	Description

``` bash
pnpm dev	//Run all apps concurrently
pnpm build	//Build all apps/packages
pnpm lint	//Run lint checks across workspace
pnpm format	//Format code with Prettier
pnpm check-types	//Validate TypeScript types
```
## 🌐 Local Network Setup (Expo + API)

When testing the mobile app with Expo, make sure your phone and computer are on the same Wi-Fi network.

Find your local IPv4 address:
```bash
ipconfig | findstr /i "IPv4"
```

Then update your API base URL inside the mobile app (e.g. app.json or .env):
```
{
  "extra": {
    "API_URL": "http://10.0.0.172:3000/api"
  }
}
```

This allows the mobile app to call your local Next.js API during development.

## 🧰 Recommended Tools

- VS Code Extensions
- ESLint
- Prettier - Code Formatter
- Turbo Console Log
- React Native Tools (Expo)

## 🧾 License

This project is open-sourced under the MIT License.

## 👨‍💻 Author

Abhilekh Adhikari
📍 New Hampshire, USA
🌐 GitHub: abhilekhx




















