"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { RoxLogo } from "./icons";
import { AgentStepCompleted } from "./agent/agent-step-completed";
import { AgentStepActive } from "./agent/agent-step-active";
import { AgentResult } from "./agent/agent-result";
import { useAgentFlow } from "./agent/use-agent-flow";
import type { AgentFlowConfig } from "./agent/agent-flow.types";
import { DEFAULT_FLOW } from "./agent/mock-flow";
import { AnimatePresence, motion } from "motion/react";

interface AgentMessageProps {
  config?: AgentFlowConfig;
  autoStart?: boolean;
  onFlowComplete?: () => void;
}

export default function AgentMessage({
  config = DEFAULT_FLOW,
  autoStart = true,
  onFlowComplete,
}: AgentMessageProps) {
  const {
    visibleSteps,
    stepStates,
    isFlowComplete,
    completedCount,
    totalSteps,
    totalFlowSteps,
    isStarted,
    startFlow,
    resetFlow,
  } = useAgentFlow(config);

  // Auto-start on mount
  useEffect(() => {
    if (autoStart && !isStarted) {
      startFlow();
    }
  }, [autoStart, isStarted, startFlow]);

  // Notify parent when flow completes
  useEffect(() => {
    if (isFlowComplete && onFlowComplete) {
      onFlowComplete();
    }
  }, [isFlowComplete, onFlowComplete]);

  const isComplete = isFlowComplete;

  return (
    <div className="w-full max-w-[700px] flex flex-col font-sans text-sidebar-primary">
      <div className="relative px-2">
        {/* HEADER */}
        <div className="relative z-10 flex gap-4 overflow-hidden pb-8">
          <div className="relative w-fit">
            <div className="z-10 relative w-[38px] h-[38px] rounded-full border border-[#525051] bg-inherit text-brand-accent flex items-center justify-center shrink-0">
              <RoxLogo className="w-6 h-6" />
            </div>
            {/* timeline + bg-blur */}
            <div className="w-11 h-11 -left-[3px] -top-[3px] rounded-full inset-0 mx-auto absolute bg-background z-1 blur-[2px]" />
            <div className="inset-0 mx-auto h-20 w-px bg-surface-divider absolute z-0" />
          </div>

          <div className="flex-1 flex flex-col pt-1">
            <div className="flex justify-between items-center text-base mb-2.5">
              <span
                className={cn(
                  "font-medium",
                  isComplete ? "text-brand-accent" : "text-sidebar-primary",
                )}
              >
                {isComplete
                  ? "Completed"
                  : `Step ${completedCount + 1} of ${totalSteps}`}
              </span>
              {!isComplete && (
                <span className="text-sidebar-secondary text-xs">
                  {Math.ceil(
                    ((totalFlowSteps - completedCount) *
                      (config.stepIntervalMs ?? 2000)) /
                      1000 /
                      60,
                  )}{" "}
                  min left
                </span>
              )}
            </div>
            {/* Progress Bar Segments */}
            <div className="flex gap-2 w-full">
              {Array.from({ length: totalSteps }).map((_, i) => {
                const isActiveSegment = !isComplete && i === completedCount;
                const isCompleted = isComplete || i < completedCount;

                return (
                  <div
                    key={i}
                    className="h-1.5 flex-1 rounded-full bg-[#263628] overflow-hidden"
                  >
                    {(isCompleted || isActiveSegment) && (
                      <motion.div
                        className="h-full rounded-full bg-[#5DB06F]"
                        initial={{ scaleX: isCompleted ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: isActiveSegment
                            ? (config.stepIntervalMs ?? 3000) / 1000
                            : 0.4,
                          ease: isActiveSegment ? "linear" : "easeOut",
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* STEPS */}
        <AnimatePresence mode="popLayout">
          {isStarted && !isComplete && (
            <motion.div
              className="relative z-10 flex flex-col"
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {config.steps.slice(0, visibleSteps).map((step, i) => {
                const state = stepStates.get(i);
                if (state === "completed") {
                  return <AgentStepCompleted key={i} step={step} />;
                }
                if (state === "active") {
                  return (
                    <motion.div
                      key={`active-${i}`}
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <AgentStepActive step={step} stepNumber={i + 1} />
                    </motion.div>
                  );
                }
                return null;
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AgentResult result={config.result} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
