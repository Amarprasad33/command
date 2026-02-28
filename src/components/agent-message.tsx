"use client";

import { SVGProps, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Briefcase,
  Volume2,
  Copy,
  RotateCw,
  FileText,
  ChevronRight,
} from "lucide-react";
import { RoxLogo } from "./icons";
import { ShimmeringText } from "./ui/simmering-text";
import { motion } from "motion/react";

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
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
export function AnimatedDottedCircle() {
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
      // style={{ transformOrigin: "center" }}
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

export function CheckCircleGoldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="#CEB695" strokeWidth="1.5" />
      <path
        d="M8 12.5L10.5 15L16 9"
        stroke="#CEB695"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AgentMessage({
  initialState = "progress",
}: {
  initialState?: "progress" | "completed";
}) {
  const [state, setState] = useState(initialState);

  return (
    <div className="w-full max-w-[700px] flex flex-col font-sans text-[#EBEBEB]">
      {/* Demo Toggle for Reviewing (Remove in Production) */}
      <button
        onClick={() =>
          setState((s) => (s === "progress" ? "completed" : "progress"))
        }
        className="absolute right-6 top-6 z-50 mb-8 text-xs bg-[#2A2A2A] hover:bg-[#333] transition-colors w-fit px-3 py-1.5 rounded-md border border-[#3E3E3E] shadow-xl"
      >
        Toggle View to: {state === "progress" ? "Completed" : "In Progress"}
      </button>

      <div className="relative px-2">
        {/* HEADER */}
        <div className="relative z-10 flex gap-4 overflow-hidden pb-8">
          {/* Pulse Ring / Sparkle */}
          <div className="relative w-fit">
            <div className="z-10 relative w-[38px] h-[38px] rounded-full border border-[#525051] bg-inherit text-[#CEB695] flex items-center justify-center shrink-0">
              <RoxLogo className="w-6 h-6" />
            </div>
            {/* timeline + bg-blur */}
            <div className="w-11 h-11 -left-[3px] -top-[3px] rounded-full inset-0 mx-auto absolute bg-[#141414] z-1 blur-[2px]" />
            <div className="inset-0 mx-auto h-20 w-px bg-[#383838] absolute z-0" />
          </div>

          <div className="flex-1 flex flex-col pt-1">
            <div className="flex justify-between items-center text-base mb-2.5">
              <span
                className={cn(
                  "font-medium",
                  state === "progress" ? "text-[#EBEBEB]" : "text-[#CEB695]",
                )}
              >
                {state === "progress" ? "Step 3 of 5" : "Completed"}
              </span>
              {state === "progress" && (
                <span className="text-[#848484] text-xs">1 min left</span>
              )}
            </div>
            {/* Progress Segments */}
            <div className="flex gap-2 w-full">
              <div
                className={cn("h-1.5 flex-1 rounded-full bg-[#5DB06F]")}
              ></div>
              <div
                className={cn("h-1.5 flex-1 rounded-full bg-[#5DB06F]")}
              ></div>
              <div
                className={cn("h-1.5 flex-1 rounded-full bg-[#5DB06F]")}
              ></div>
              <div
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  state === "completed" ? "bg-[#5DB06F]" : "bg-[#263628]",
                )}
              ></div>
              <div
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  state === "completed" ? "bg-[#5DB06F]" : "bg-[#263628]",
                )}
              ></div>
            </div>
          </div>
        </div>

        {/* BODY - PROGRESS */}
        {state === "progress" && (
          <div className="relative z-10 flex flex-col">
            {/* Step 1 - Search-done */}
            <div className="flex gap-4 pb-4">
              <div className="relative w-fit">
                <div className="z-10 relative w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0">
                  <div className="border border-[#383838] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                    <div className="size-[18px] shrink-0 flex justify-center items-center rounded-full bg-[linear-gradient(330deg,#545252_0%,#828282_100%)]">
                      <CheckIcon className="w-[10px] h-[10px]" />
                    </div>
                  </div>
                </div>
                {/* timeline + bg-blur */}
                <div className="w-11 h-11 -left-[3px] -top-[3px] rounded-full inset-0 mx-auto absolute bg-[#141414] z-1 blur-[2px]" />
                <div className="inset-0 mx-auto h-28 w-px bg-[#383838] absolute z-0" />
              </div>

              <div className="flex flex-col gap-3 pt-0 opacity-40">
                <div className="text-base text-[#A3A3A3] leading-snug pr-8 tracking-wide">
                  Looking at any recent meeting you have had with this account
                  of the past couple days and summarizing findings
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 bg-[#1C1C1C] border border-[#333333] rounded-full px-2.5 py-1 text-[11px] text-[#848484]">
                    <Search className="w-3 h-3" />
                    Retrieving available deal pages
                  </span>
                </div>
              </div>
            </div>

            {/* Step - 2 - Search-done */}

            <div className="flex gap-4 pb-4">
              <div className="relative w-fit">
                <div className="z-10 relative w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0">
                  <div className="border border-[#383838] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                    <div className="size-[18px] shrink-0 flex justify-center items-center rounded-full bg-[linear-gradient(330deg,#545252_0%,#828282_100%)]">
                      <CheckIcon className="w-[10px] h-[10px]" />
                    </div>
                  </div>
                </div>
                {/* timeline + bg-blur */}
                <div className="w-11 h-11 -left-[3px] -top-[3px] rounded-full inset-0 mx-auto absolute bg-[#141414] z-1 blur-[2px]" />
                <div className="inset-0 mx-auto h-28 w-px bg-[#383838] absolute z-0" />
              </div>

              <div className="flex flex-col gap-3 pt-0 opacity-40">
                <div className="text-base text-[#A3A3A3] leading-snug pr-8 tracking-wide">
                  Searching my deals and seeing if there has been any activity
                  on the deal
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 bg-[#1C1C1C] border border-[#333333] rounded-full px-2.5 py-1 text-[11px] text-[#848484]">
                    <Search className="w-3 h-3" strokeWidth={2.5} />
                    Retrieving information on public news posing for Stripe
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#1C1C1C] border border-[#333333] rounded-full px-2.5 py-1 text-[11px] text-[#848484]">
                    <Briefcase className="w-3 h-3" />
                    Retrieving deals for Stripe
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 (Active-search) */}
            <div className="flex gap-4">
              <div className="relative w-fit">
                <div className="z-10 relative w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0">
                  <AnimatedDottedCircle />
                  <div className="size-6 shrink-0 flex justify-center items-center rounded-full bg-[#564B2F]">
                    <span className="text-xs font-normal text-[#D7CAAC]">
                      3
                    </span>
                  </div>
                </div>
                {/* timeline + bg-blur */}
                <div className="w-11 h-11 -left-[3px] -top-[3px] rounded-full inset-0 mx-auto absolute bg-[#141414] z-1 blur-[2px]" />
                <div className="inset-0 mx-auto h-28 w-px bg-[#383838] absolute z-0" />
              </div>
              <div className="flex flex-col gap-3 pt-0.5">
                <div className="text-base text-[#EBEBEB] leading-snug tracking-wide">
                  <ShimmeringText
                    text="Searching Rox and the web for recent public news on this account"
                    color="#474747"
                    shimmerColor="#C6B59D"
                  />
                </div>

                <div className="flex items-center gap-2 text-[#EBEBEB] text-sm font-medium mt-1">
                  <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-[#EBEBEB] flex justify-center items-center">
                    <div className="w-[6px] h-[6px] bg-[#EBEBEB] rounded-full"></div>
                  </div>
                  Reasoning
                </div>

                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="flex items-center gap-1.5 bg-[#1C1C1C] border border-[#333333] rounded-full px-2.5 py-1 text-[11px] text-[#848484]">
                    <Search className="w-3 h-3" strokeWidth={2.5} />
                    Retrieving information on public news posing for Stripe
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BODY - COMPLETED */}
        {state === "completed" && (
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="relative w-fit">
                <div className="z-10 relative w-[38px] h-[38px] rounded-full border border-[#D8C3A6] bg-inherit text-[#CEB695] flex items-center justify-center shrink-0">
                  <span className="size-6 bg-[#CEB695] rounded-full flex items-center justify-center">
                    <CheckIcon className="w-[14px] h-[14px]" />
                  </span>
                </div>
              </div>
              <div className="flex flex-col pt-0 w-full pr-8">
                <div className="text-base font-normal text-[#A3A3A3] leading-snug mb-3 tracking-wide">
                  Analysis complete. See findings
                </div>
                <div className="flex items-center gap-2 border border-[#2E2E2E] rounded-[10px] pl-3 pr-1.5 py-1.5 text-xs text-[#848484] bg-transparent w-fit mb-4">
                  <FileText className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  <span className="mr-1">Search complete.</span>
                  <button className="bg-[#CEB695] text-[#121212] font-semibold px-2 py-1.5 rounded-md ml-1 transition-opacity hover:opacity-90 leading-none">
                    View results
                  </button>
                </div>

                <div className="text-base text-[#A3A3A3] leading-relaxed flex flex-col gap-1 pb-2">
                  <p>
                    Expansion: Announced a new strategic partnership with NVIDIA
                    to accelerate AI checkout speeds.
                  </p>
                  <p>
                    Product: Launched "Adaptive Checkout" globally, reducing
                    cart abandonment by 12%.
                  </p>
                  <p>
                    Market: Expanded local acquiring capabilities into three new
                    Southeast Asian markets.
                  </p>
                  <p>
                    Executive: Appointed a new Head of Global Sales to drive
                    enterprise growth.
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-4 mt-4">
                  <button className="text-[#666] hover:text-[#EBEBEB] transition-colors">
                    <Volume2 className="w-[18px] h-[18px]" strokeWidth={2} />
                  </button>
                  <button className="text-[#666] hover:text-[#EBEBEB] transition-colors">
                    <Copy className="w-[18px] h-[18px]" strokeWidth={2} />
                  </button>
                  <button className="text-[#666] hover:text-[#EBEBEB] transition-colors">
                    <RotateCw className="w-[18px] h-[18px]" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
