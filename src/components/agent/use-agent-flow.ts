import { useState, useCallback, useRef, useEffect } from "react";
import type { AgentFlowConfig, StepState } from "./agent-flow.types";

interface AgentFlowState {
  /** How many steps are currently visible (1-indexed) */
  visibleSteps: number;
  /** Map from step index → its visual state */
  stepStates: Map<number, StepState>;
  /** Whether all steps are done and the result card should show */
  isFlowComplete: boolean;
  /** Number of completed steps (drives the progress bar) */
  completedCount: number;
  /** Whether the flow has been started */
  isStarted: boolean;
}

export function useAgentFlow(config: AgentFlowConfig) {
  const intervalMs = config.stepIntervalMs ?? 2000;
  const totalFlowSteps = config.steps.length;

  const [state, setState] = useState<AgentFlowState>({
    visibleSteps: 0,
    stepStates: new Map(),
    isFlowComplete: false,
    completedCount: 0,
    isStarted: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advanceStep = useCallback(() => {
    setState((prev) => {
      const newStates = new Map(prev.stepStates);
      const currentActiveIndex = prev.visibleSteps - 1;

      // Mark current active step as completed
      if (currentActiveIndex >= 0) {
        newStates.set(currentActiveIndex, "completed");
      }

      const nextIndex = currentActiveIndex + 1;

      // All steps are done - show result
      if (nextIndex >= totalFlowSteps) {
        return {
          ...prev,
          stepStates: newStates,
          isFlowComplete: true,
          completedCount: totalFlowSteps,
        };
      }

      // Reveal next step as active
      newStates.set(nextIndex, "active");
      return {
        ...prev,
        visibleSteps: nextIndex + 1,
        stepStates: newStates,
        completedCount: currentActiveIndex + 1,
      };
    });
  }, [totalFlowSteps]);

  // Auto-advance timer
  useEffect(() => {
    if (!state.isStarted || state.isFlowComplete) return;

    timerRef.current = setTimeout(() => {
      advanceStep();
    }, intervalMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    state.isStarted,
    state.isFlowComplete,
    state.visibleSteps,
    intervalMs,
    advanceStep,
  ]);

  const startFlow = useCallback(() => {
    const initialStates = new Map<number, StepState>();
    initialStates.set(0, "active");

    setState({
      visibleSteps: 1,
      stepStates: initialStates,
      isFlowComplete: false,
      completedCount: 0,
      isStarted: true,
    });
  }, []);

  const resetFlow = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState({
      visibleSteps: 0,
      stepStates: new Map(),
      isFlowComplete: false,
      completedCount: 0,
      isStarted: false,
    });
  }, []);

  return {
    ...state,
    totalSteps: config.totalSteps,
    totalFlowSteps,
    startFlow,
    resetFlow,
  };
}
