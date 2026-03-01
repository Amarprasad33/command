# Command — Chat Interface for Rox

A chat interface built for **Rox** as part of a frontend design challenge. The app lets users interact with an AI agent that runs multi-step workflows like account research, weekly briefs, and outreach campaigns.

## Features

- **User & Agent Messages** — distinct chat bubbles for user input and agent responses
- **Multi-step Agent Flow** — animated step-by-step execution with real-time status indicators
- **Progress Bar** — segmented progress that fills as each step completes
- **Account Selector** — sidebar dropdown to switch between accounts
- **Saved Prompts** — quick-access prompt picker in the sidebar
- **Collapsible Sidebar** — icon-only collapsed state with smooth transitions
- **Command Input** — rich input bar with file attach, prompt suggestions, and keyboard shortcuts

## Tech Stack

| Layer     | Tech                             |
| --------- | -------------------------------- |
| Framework | Next.js 16 (App Router)          |
| Language  | TypeScript                       |
| Styling   | Tailwind CSS v4                  |
| Animation | Motion (Framer Motion)           |
| UI        | Base UI (Radix-style primitives) |
| Icons     | Lucide React + custom SVGs       |

## Project Structure

```
src/
├── app/                  # Next.js app router (layout, page, globals)
├── components/
│   ├── agent/            # Agent flow engine (types, hook, step components)
│   ├── landing/          # Landing page cards
│   ├── ui/               # Reusable UI primitives (sidebar, dropdown, etc.)
│   ├── app-sidebar.tsx   # Main sidebar with nav, prompts, account selector
│   ├── agent-message.tsx # Agent message wrapper
│   ├── chat-context.tsx  # Chat state provider
│   ├── chat-page-landing.tsx  # Chat thread + landing view
│   ├── command-input.tsx # Message input bar
│   └── icons.tsx         # Custom SVG icon components
└── lib/                  # Utilities (cn helper, etc.)
```

## Local Setup

```bash
git clone <repo-url>
cd command
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
