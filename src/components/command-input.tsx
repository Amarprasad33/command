"use client";

import { useRef, useState } from "react";
import { AudioLines, Bookmark } from "lucide-react";
import {
  ArrowUp,
  CaretUpDown,
  StopMessage,
  Notion,
  OpenAI,
  Polar,
  Stripe,
} from "./icons";
import { cn } from "@/lib/utils";
import { useChatContext } from "./chat-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ACCOUNTS = [
  {
    id: "stripe",
    name: "Stripe",
    icon: Stripe,
    shortName: "S",
    color: "#635BFF",
  },
  {
    id: "notion",
    name: "Notion",
    icon: Notion,
    shortName: "N",
    color: "#000000",
  },
  {
    id: "openai",
    name: "OpenAI",
    icon: OpenAI,
    shortName: "O",
    color: "#10A37F",
  },
  {
    id: "polar",
    name: "Polar",
    icon: Polar,
    shortName: "P",
    color: "#000000",
  },
];

export default function CommandInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const [value, setValue] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
  const { sendMessage, isAgentRunning } = useChatContext();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    const newHeight = Math.min(e.target.scrollHeight, 180);
    e.target.style.height = `${newHeight}px`;
    setIsMultiline(newHeight > 28);
  };

  const handleSend = () => {
    if (!value.trim() || isAgentRunning) return;
    sendMessage(value);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsMultiline(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex w-full max-w-[792px] flex-col rounded-2xl border border-surface-border bg-surface-sunken">
      {/* Input Area */}
      <div
        className={cn(
          "relative flex rounded-2xl border border-surface-border bg-surface-input px-4 py-4 -translate-y-px -translate-x-px w-[calc(100%+2px)] transition-all",
          isMultiline ? "flex-col items-end gap-2" : "items-end",
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          placeholder="Type @ to change account"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className="w-full resize-none bg-transparent text-sm leading-relaxed text-sidebar-primary placeholder:text-sidebar-secondary focus:outline-none min-h-[28px] overflow-auto no-scrollbar"
        />
        <button
          onClick={handleSend}
          disabled={isAgentRunning || !value.trim()}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-surface-elevated hover:bg-surface-chip-border text-sidebar-primary transition-colors h-8 w-8 shadow-[0_2px_5px_0px_#00000024]",
            !isMultiline && "ml-3",
            (isAgentRunning || !value.trim()) &&
              "opacity-40 cursor-not-allowed",
          )}
        >
          {isAgentRunning ? (
            <StopMessage className="h-4 w-4" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Footer Area */}
      <div className="flex items-center justify-between px-3.5 pb-2.5 pt-2">
        <div className="flex items-center gap-3">
          <button className="text-sidebar-secondary hover:text-sidebar-primary transition-colors ml-0.5">
            <Bookmark className="h-[18px] w-[18px] stroke-[1.5]" />
          </button>

          {/* Account Pill */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-1.5 rounded-lg border border-surface-elevated bg-surface-input pl-1 pr-2 py-1 text-xs text-sidebar-primary hover:bg-surface-elevated-hover transition-colors outline-none focus:ring-1 focus:ring-[#444]">
                <selectedAccount.icon className="h-5 w-5 shrink-0" />
                <span className="font-medium mr-1">{selectedAccount.name}</span>
                <CaretUpDown className="h-3 w-3 text-[#ACACAC]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="w-[140px] rounded-xl border-0 bg-surface-input p-2 flex flex-col gap-1 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
            >
              {ACCOUNTS.map((account) => (
                <DropdownMenuItem
                  key={account.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-sidebar-primary hover:text-sidebar-accent-primary hover:bg-sidebar-accent-hover focus:bg-sidebar-accent-hover"
                  onClick={() => setSelectedAccount(account)}
                >
                  <account.icon className="h-5 w-5 shrink-0" />
                  {account.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-[11px] text-text-disabled mr-1">
          Command can make mistakes
        </div>
      </div>
    </div>
  );
}
