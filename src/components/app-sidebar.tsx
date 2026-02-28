"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import Image from "next/image";
import {
  CaretUpDown,
  Folder,
  More,
  NewCommand,
  RoxLockup_sm,
  Search,
  SidebarIcon,
} from "@/components/icons";
import { useSidebar } from "@/components/ui/sidebar";
// import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { title: "New Command", icon: NewCommand, url: "#" },
  { title: "Search Accounts", icon: Search, url: "#" },
  { title: "Saved Prompts", icon: Folder, url: "#" },
];
const commands = [
  { title: "Account developments for passports", url: "#" },
  { title: "Weekly reports ", url: "#" },
  { title: "Outreach campaigns last month", url: "#" },
];

export function AppSidebar() {
  const { state } = useSidebar();

  //   useEffect(() => {
  //     console.log(state);
  //   }, [state]);

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-sidebar">
      <SidebarHeader className="p-xs">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-xs flex items-center",
                state === "collapsed"
                  ? "justify-center flex-col"
                  : "flex-row justify-between",
              )}
            >
              <div className="flex aspect-square w-fit items-center justify-center text-sidebar-primary-foreground">
                <RoxLockup_sm
                  className={cn(
                    "w-9! h-5!",
                    state === "collapsed" && "w-7! h-4!",
                  )}
                />
              </div>
              <motion.div layoutId="sidebar-trigger">
                <SidebarTrigger>
                  <SidebarIcon />
                </SidebarTrigger>
              </motion.div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarGroup className="p-xs">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div
                  className={cn(
                    "text-xs p-xs text-sidebar-secondary font-medium",
                    state === "collapsed" && "hidden",
                  )}
                >
                  Agents
                </div>
              </SidebarMenuItem>

              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="group p-xs hover:bg-sidebar-accent-hover text-sidebar-primary hover:text-sidebar-accent-primary"
                    tooltip={item.title}
                    render={<a href={item.url} />}
                  >
                    <item.icon className="text-sidebar-primary group-hover/menu-item:text-sidebar-accent-primary" />
                    <span className="text-base font-normal group-hover/menu-item:text-sidebar-accent-primary">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state === "expanded" && (
          <SidebarGroup className="p-xs">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div
                    className={cn(
                      "text-xs p-xs text-sidebar-secondary font-medium",
                    )}
                  >
                    Commands
                  </div>
                </SidebarMenuItem>

                {commands.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="group p-xs hover:bg-sidebar-accent-hover text-sidebar-primary hover:text-sidebar-accent-primary"
                      tooltip={item.title}
                      render={<a href={item.url} />}
                    >
                      <span className="text-base font-normal group-hover/menu-item:text-sidebar-accent-primary">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton className="group p-xs text-sidebar-secondary hover:text-sidebar-secondary-hover">
                    <More className="text-sidebar-secondary group-hover/menu-item:text-sidebar-secondary-hover" />
                    <span className="text-sm font-normal">View All</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-xs">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="p-xs flex hover:bg-[#1F1F1F]"
            >
              <div className="min-w-8 min-h-8 rounded-full bg-[#263628] flex items-center justify-center">
                <span className="text-[#6DC06B]">Y</span>
              </div>
              <AnimatePresence mode="wait">
                {state === "expanded" && (
                  <motion.div
                    layout
                    className="flex w-full items-center"
                    initial={{ opacity: 0.7, x: -15, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -15, filter: "blur(4px)" }}
                  >
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Yuma</span>
                      <span className="text-xs text-muted-foreground">Rox</span>
                    </div>
                    <CaretUpDown className="ml-auto" />
                  </motion.div>
                )}
              </AnimatePresence>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
