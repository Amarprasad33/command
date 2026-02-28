import { ArrowUpDiagonal } from "../icons";

export default function WorkflowCard() {
  return (
    <div className="flex flex-col bg-[#151514] border border-[#21211F] rounded-2xl min-h-52 min-w-72 p-2 group">
      <div className="w-full h-[80%] bg-[#121212] border border-[#21211F] rounded-xl"></div>

      {/* label */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-base font-normal text-white">Weekly reports</div>

        <div className="group-hover:block hidden">
          <ArrowUpDiagonal />
        </div>
      </div>
    </div>
  );
}
