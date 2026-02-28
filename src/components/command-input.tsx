"use client";

import { useRef, useState } from "react";
import { AudioLines, Bookmark } from "lucide-react";
import { CaretUpDown } from "./icons";
import { cn } from "@/lib/utils";

export default function CommandInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    const newHeight = Math.min(e.target.scrollHeight, 180); // 180px max height
    e.target.style.height = `${newHeight}px`;

    if (newHeight > 28) {
      setIsMultiline(true);
    } else {
      setIsMultiline(false);
    }
  };

  return (
    <div className="flex w-full max-w-[792px] flex-col rounded-2xl border border-[#2E2E2E] bg-[#121212]">
      {/* Input Area */}
      <div
        className={cn(
          "relative flex rounded-2xl border border-[#2E2E2E] bg-[#1A1A1A] px-4 py-4 -translate-y-px -translate-x-px w-[calc(100%+2px)] transition-all",
          isMultiline ? "flex-col items-end gap-2" : "items-end",
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Type @ to change account"
          onChange={handleInput}
          className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#EBEBEB] placeholder:text-sidebar-secondary focus:outline-none min-h-[28px] overflow-auto no-scrollbar"
        />
        <button
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-[#2A2A2A] hover:bg-[#333] text-[#EBEBEB] transition-colors h-8 w-8",
            !isMultiline && "ml-3",
          )}
        >
          <AudioLines className="h-4 w-4" />
        </button>
      </div>

      {/* Footer Area */}
      <div className="flex items-center justify-between px-3.5 pb-2.5 pt-2">
        <div className="flex items-center gap-3">
          <button className="text-sidebar-secondary hover:text-[#EBEBEB] transition-colors ml-0.5">
            <Bookmark className="h-[18px] w-[18px] stroke-[1.5]" />
          </button>

          {/* Account Pill */}
          <button className="flex items-center gap-1.5 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] pl-1 pr-2 py-1 text-xs text-[#EBEBEB] hover:bg-[#252525] transition-colors">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#635BFF] text-[11px] font-bold text-white">
              S
            </div>
            <span className="font-medium mr-1">Stripe</span>
            <CaretUpDown className="h-3 w-3" />
          </button>
        </div>

        <div className="text-[11px] text-[#555] mr-1">
          Command can make mistakes
        </div>
      </div>
    </div>
  );
}
