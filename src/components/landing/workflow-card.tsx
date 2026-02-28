import { SVGProps } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { useChatContext } from "@/components/chat-context";

interface WorkflowCardProps {
  label: string;
  image: string;
}

export default function WorkflowCard({ label, image }: WorkflowCardProps) {
  const { sendMessage } = useChatContext();

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      onClick={() => sendMessage(label)}
      className="flex flex-col bg-[#151514] border border-[#21211F] rounded-2xl min-h-52 min-w-72 p-2 group cursor-pointer"
    >
      {/* Preview image */}
      <div className="relative w-full flex-1 bg-surface-sunken border border-[#21211F] rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={label}
          width={256}
          height={165}
          className="object-cover object-top"
        />
      </div>

      {/* label */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-base font-normal text-white px-1">{label}</div>

        <div>
          <ArrowUpDiagonal />
        </div>
      </div>
    </motion.div>
  );
}

export function ArrowUpDiagonal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <motion.path
        d="M4.63 14.18 L13.77 3.66 M6.35 3.66 L13.77 3.66 L13.77 11.64"
        fill="none"
        stroke="#CEB695"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
}
