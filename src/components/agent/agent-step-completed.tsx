"use client";

import { Search, Briefcase, FileText, ChevronRight } from "lucide-react";
import type { AgentStep, SearchChip } from "./agent-flow.types";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.71875 5.46875L3.90625 7.65625L8.28125 2.96875"
        stroke="#171717"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CHIP_ICONS = {
  search: Search,
  briefcase: Briefcase,
  file: FileText,
} as const;

function ChipRow({ chips }: { chips: SearchChip[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip, i) => {
        const Icon = CHIP_ICONS[chip.icon];
        return (
          <span
            key={i}
            className="flex items-center gap-1.5 bg-surface-chip border border-surface-chip-border rounded-full px-2.5 py-1 text-[11px] text-sidebar-secondary"
          >
            <Icon className="w-3 h-3" strokeWidth={2.5} />
            {chip.label}
            {chip.hasArrow && <ChevronRight className="w-3 h-3 ml-0.5" />}
          </span>
        );
      })}
    </div>
  );
}

export function AgentStepCompleted({ step }: { step: AgentStep }) {
  return (
    <div className="flex gap-4 pb-2 sm:pb-4">
      <div className="relative w-fit">
        <div className="z-10 relative w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0">
          <div className="border border-surface-divider w-[30px] h-[30px] rounded-full flex items-center justify-center">
            <div className="size-[18px] shrink-0 flex justify-center items-center rounded-full bg-[linear-gradient(330deg,#545252_0%,#828282_100%)]">
              <CheckIcon className="w-[10px] h-[10px]" />
            </div>
          </div>
        </div>
        {/* timeline + bg-blur */}
        <div className="w-11 h-11 -left-[3px] -top-[3px] rounded-full inset-0 mx-auto absolute bg-background z-1 blur-[2px]" />
        <div className="inset-0 mx-auto h-[142px] sm:h-28 w-px bg-surface-divider absolute z-0" />
      </div>

      <div className="flex flex-col gap-3 pt-0 opacity-40">
        <div className="text-base text-text-muted leading-snug pr-8 tracking-wide">
          {step.text}
        </div>
        <ChipRow chips={step.chips} />
      </div>
    </div>
  );
}
