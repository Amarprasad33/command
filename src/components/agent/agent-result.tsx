"use client";

import { RotateCw, FileText } from "lucide-react";
import type { AgentResult as AgentResultType } from "./agent-flow.types";
import { Speaker, Copy, Reload } from "../icons";

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

export function AgentResult({ result }: { result: AgentResultType }) {
  return (
    <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
      <div className="flex gap-4">
        <div className="relative w-fit">
          <div className="z-10 relative w-[38px] h-[38px] rounded-full border border-[#D8C3A6] bg-inherit text-brand-accent flex items-center justify-center shrink-0">
            <span className="size-6 bg-brand-accent rounded-full flex items-center justify-center">
              <CheckIcon className="w-[14px] h-[14px]" />
            </span>
          </div>
        </div>
        <div className="flex flex-col pt-2 w-full pr-8">
          <div className="text-base font-normal text-text-muted leading-snug mb-3 tracking-wide">
            {result.summary}
          </div>
          <div className="flex items-center gap-2 border border-surface-border rounded-[10px] pl-3 pr-1.5 py-1.5 text-xs text-sidebar-secondary bg-transparent w-fit mb-4">
            <FileText className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
            <span className="mr-1">Search complete.</span>
            <button className="bg-brand-accent text-surface-sunken font-semibold px-2 py-1.5 rounded-md ml-1 transition-opacity hover:opacity-90 leading-none">
              View results
            </button>
          </div>

          <div className="text-base text-text-muted leading-relaxed flex flex-col gap-1 pb-2">
            {result.findings.map((finding, i) => (
              <p key={i}>{finding}</p>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 mt-2 sm:mt-4">
            <button className="text-text-tertiary hover:text-sidebar-primary transition-colors">
              <Speaker className="w-[18px] h-[18px]" />
            </button>
            <button className="text-text-tertiary hover:text-sidebar-primary transition-colors">
              <Copy className="w-[18px] h-[18px]" />
            </button>
            <button className="text-text-tertiary hover:text-sidebar-primary transition-colors">
              <Reload className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
