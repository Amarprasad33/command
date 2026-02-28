import type { LucideIcon } from "lucide-react";

/** A single chip shown below a step (e.g. "Retrieving deals for Stripe") */
export type SearchChip = {
  icon: "search" | "briefcase" | "file";
  label: string;
  hasArrow?: boolean;
};

/** Each step in the agent flow */
export type AgentStep = {
  text: string;
  chips: SearchChip[];
};

/** The final result shown after all steps complete */
export type AgentResult = {
  summary: string;
  findings: string[];
};

/** Full flow configuration — fed into useAgentFlow */
export type AgentFlowConfig = {
  totalSteps: number;
  steps: AgentStep[];
  result: AgentResult;
  stepIntervalMs?: number;
};

/** The visual state of each individual step */
export type StepState = "active" | "completed";
