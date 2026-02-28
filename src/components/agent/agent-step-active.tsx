"use client";

import { Search, Briefcase, FileText, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ShimmeringText } from "../ui/simmering-text";
import type { AgentStep, SearchChip } from "./agent-flow.types";

function AnimatedDottedCircle() {
  return (
    <motion.svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-10 absolute inset-0"
      initial={{ transform: "rotate(0deg)" }}
      animate={{ transform: "rotate(360deg)" }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <circle cx="19" cy="19" r="18.5" stroke="#7D704C" strokeDasharray="3 3" />
    </motion.svg>
  );
}

const CHIP_ICONS = {
  search: Search,
  briefcase: Briefcase,
  file: FileText,
} as const;

function ChipRow({ chips }: { chips: SearchChip[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {chips.map((chip, i) => {
        const Icon = CHIP_ICONS[chip.icon];
        return (
          <motion.span
            initial={{ opacity: 0.6, scale: 0.97, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.25, delay: 0.4 + 0.1 * i }}
            key={i}
            className="flex items-center gap-1.5 bg-surface-chip border border-surface-chip-border rounded-full px-2.5 py-1 text-[11px] text-sidebar-secondary"
          >
            <Icon className="w-3 h-3" strokeWidth={2.5} />
            {chip.label}
            {chip.hasArrow && <ChevronRight className="w-3 h-3 ml-0.5" />}
          </motion.span>
        );
      })}
    </div>
  );
}

export function AgentStepActive({
  step,
  stepNumber,
}: {
  step: AgentStep;
  stepNumber: number;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative w-fit">
        <div className="z-10 relative w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0">
          <AnimatedDottedCircle />
          <div className="size-6 shrink-0 flex justify-center items-center rounded-full bg-[#564B2F]">
            <span className="text-xs font-normal text-[#D7CAAC]">
              {stepNumber}
            </span>
          </div>
        </div>
        {/* timeline + bg-blur */}
        <div className="w-11 h-11 -left-[3px] -top-[3px] rounded-full inset-0 mx-auto absolute bg-background z-1 blur-[2px]" />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 112 }} // 112px corresponds to h-28
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="inset-0 mx-auto w-px bg-surface-divider absolute z-0"
        />
      </div>
      <div className="flex flex-col gap-3 pt-0.5">
        <div className="text-base text-sidebar-primary leading-snug tracking-wide">
          <ShimmeringText
            text={step.text}
            color="#474747"
            shimmerColor="#C6B59D"
          />
        </div>

        <div className="flex items-center gap-2 text-sidebar-primary text-sm font-medium mt-1">
          <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-sidebar-primary flex justify-center items-center">
            <div className="w-[6px] h-[6px] bg-sidebar-primary rounded-full"></div>
          </div>
          Reasoning
        </div>

        <ChipRow chips={step.chips} />
      </div>
    </div>
  );
}
