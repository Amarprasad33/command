import AgentMessage from "@/components/agent-message";

export default function PlayPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white dark:bg-background">
      <div className="mt-20"></div>
      <AgentMessage />
    </div>
  );
}
