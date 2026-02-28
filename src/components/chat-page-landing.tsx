"use client";

import CommandInput from "./command-input";
import { RoxLogo } from "./icons";
import WorkflowCard from "./landing/workflow-card";
import { useChatContext, type ChatMessage } from "./chat-context";
import AgentMessage from "./agent-message";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end w-full">
      <div className="bg-surface-elevated text-sidebar-primary text-sm leading-relaxed rounded-2xl px-4 py-3 max-w-[520px]">
        {content}
      </div>
    </div>
  );
}

function ChatThread({ messages }: { messages: ChatMessage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { markAgentDone } = useChatContext();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto no-scrollbar w-full max-w-3xl mx-auto px-4 pt-12 pb-6"
    >
      <div className="flex flex-col gap-8">
        {messages.map((msg) => {
          if (msg.role === "user") {
            return <UserBubble key={msg.id} content={msg.content} />;
          }
          return (
            <div key={msg.id} className="flex justify-start w-full">
              <AgentMessage
                config={msg.config}
                autoStart={true}
                onFlowComplete={markAgentDone}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingContent() {
  return (
    <div className="flex-col items-center justify-center mt-36 max-w-5xl w-full">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-center">
          <RoxLogo />
        </div>
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex items-center justify-center">
            <span className="text-4xl font-semibold text-white">Hey Yuma,</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl font-medium text-landing-text-secondary">
              How can I help you today?
            </span>
          </div>
        </div>
      </div>

      <div className="mt-9">
        <div className="flex gap-4 justify-center">
          <WorkflowCard
            label="Weekly Account Brief"
            image="/assets/images/weekly-acc-brief.png"
          />
          <WorkflowCard
            label="Public Signal Scan"
            image="/assets/images/signal-scan.png"
          />
        </div>
      </div>
    </div>
  );
}

export default function ChatPageLanding() {
  const { messages } = useChatContext();
  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full w-full flex-col items-center selection:bg-sidebar-accent-hover selection:text-sidebar-accent-primary">
      {hasMessages ? <ChatThread messages={messages} /> : <LandingContent />}

      {/* Input area — always pinned at bottom */}
      <div
        className={cn(
          "flex justify-center w-full z-50",
          hasMessages ? "sticky bottom-0 bg-background pb-4 pt-2" : "mt-20",
        )}
      >
        <CommandInput />
      </div>
    </div>
  );
}
