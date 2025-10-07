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

sports-analytics/
├── apps/
│ ├── web/ # Next.js web app (frontend)
│ ├── mobile/ # Expo mobile app
│ └── docs/ # Documentation site
│
├── packages/
│ ├── types/ # Shared TypeScript types
│ ├── ui/ # Shared React UI components
│ ├── validation/ # Zod schemas and validators
│ ├── eslint-config/ # Shared linting rules
│ └── tsconfig/ # Shared TS configs
│
├── turbo.json # Turborepo pipeline config
├── pnpm-workspace.yaml # Workspace definitions
└── package.json # Root scripts and dependencies

---

