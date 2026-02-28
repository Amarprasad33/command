import Image from "next/image";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ChatPageLanding from "@/components/chat-page-landing";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white dark:bg-background">
      <ChatPageLanding />
    </main>
  );
}
