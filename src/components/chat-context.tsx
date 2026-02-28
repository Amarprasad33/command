"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { AgentFlowConfig } from "./agent/agent-flow.types";
import { DEFAULT_FLOW } from "./agent/mock-flow";

export type ChatMessage =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "agent"; config: AgentFlowConfig };

interface ChatContextValue {
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  markAgentDone: () => void;
  isAgentRunning: boolean;
  resetChat: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAgentRunning, setIsAgentRunning] = useState(false);

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isAgentRunning) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
      };

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: "agent",
        config: DEFAULT_FLOW,
      };

      setMessages((prev) => [...prev, userMsg, agentMsg]);
      setIsAgentRunning(true);
    },
    [isAgentRunning],
  );

  const resetChat = useCallback(() => {
    setMessages([]);
    setIsAgentRunning(false);
  }, []);

  const markAgentDone = useCallback(() => {
    setIsAgentRunning(false);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        markAgentDone,
        isAgentRunning,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
