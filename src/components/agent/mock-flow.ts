import type { AgentFlowConfig } from "./agent-flow.types";

export const DEFAULT_FLOW: AgentFlowConfig = {
  totalSteps: 5,
  stepIntervalMs: 3000,
  steps: [
    {
      text: "Looking at any recent meeting you have had with this account of the past couple days and summarizing findings",
      chips: [{ icon: "search", label: "Retrieving available deal pages" }],
    },
    {
      text: "Searching my deals and seeing if there has been any activity on the deal",
      chips: [
        {
          icon: "search",
          label: "Retrieving information on public news posing for Stripe",
        },
        {
          icon: "briefcase",
          label: "Retrieving deals for Stripe",
          hasArrow: true,
        },
      ],
    },
    {
      text: "Searching Rox and the web for recent public news on this account",
      chips: [
        {
          icon: "search",
          label: "Retrieving information on public news posing for Stripe",
        },
      ],
    },
    {
      text: "Analyzing competitive landscape and identifying potential opportunities",
      chips: [
        { icon: "search", label: "Scanning competitive intelligence feeds" },
        { icon: "file", label: "Reviewing market reports" },
      ],
    },
  ],
  result: {
    summary: "Analysis complete. See findings",
    findings: [
      "Expansion: Announced a new strategic partnership with NVIDIA to accelerate AI checkout speeds.",
      'Product: Launched "Adaptive Checkout" globally, reducing cart abandonment by 12%.',
      "Market: Expanded local acquiring capabilities into three new Southeast Asian markets.",
      "Executive: Appointed a new Head of Global Sales to drive enterprise growth.",
    ],
  },
};
