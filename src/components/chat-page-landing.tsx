import CommandInput from "./command-input";
import { RoxLogo } from "./icons";
import WorkflowCard from "./landing/workflow-card";

export default function ChatPageLanding() {
  return (
    <div className="flex h-full w-full flex-col items-center selection:bg-sidebar-accent-hover selection:text-sidebar-accent-primary">
      <div className="flex-col items-center justify-center mt-36 max-w-5xl w-full">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-center">
            <RoxLogo />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-center">
              <span className="text-4xl font-semibold text-white">
                Hey Yuma,
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-medium text-[#7F7F7F]">
                How can I help you today?
              </span>
            </div>
          </div>
        </div>

        <div className="mt-9">
          <div className="flex gap-4 justify-center">
            <WorkflowCard />
            <WorkflowCard />
          </div>
        </div>

        {/* Input area */}
        <div className="mt-20 flex justify-center w-full">
          <CommandInput />
        </div>
      </div>
    </div>
  );
}
