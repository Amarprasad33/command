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
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useChatContext } from "./chat-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SAVED_PROMPTS = [
  "Weekly reports for this account",
  "Outreach campaigns last month and the results",
  "Monthly reports for this account",
  "Monthly reports for this account",
  "Monthly reports for this account",
  "Monthly reports for this account",
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { resetChat, sendMessage } = useChatContext();

  const navItems = [
    {
      title: "New Command",
      icon: NewCommand,
      url: "#",
      onClick: () => resetChat(),
      dropdown: null,
    },
    {
      title: "Search Accounts",
      icon: Search,
      url: "#",
      onClick: () => {},
      dropdown: null,
    },
    {
      title: "Saved Prompts",
      icon: Folder,
      url: "#",
      onClick: null,
      dropdown: "saved-prompts",
    },
  ];

  const commands = [
    {
      title: "Account developments for passports",
      url: "#",
      onClick: () => {},
    },
    { title: "Weekly reports ", url: "#", onClick: () => {} },
    { title: "Outreach campaigns last month", url: "#", onClick: () => {} },
  ];

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
              <div
                className="flex aspect-square w-fit items-center justify-center text-sidebar-primary-foreground"
                onClick={resetChat}
              >
                <RoxLockup_sm
                  className={cn(
                    "w-9! h-5!",
                    state === "collapsed" && "w-7! h-4!",
                  )}
                />
              </div>
              <motion.div
                layoutId="sidebar-trigger"
                className="hover:bg-surface-hover rounded-md"
              >
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

              {navItems.map((item) =>
                item.dropdown === "saved-prompts" ? (
                  <SidebarMenuItem key={item.title}>
                    <div className="w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-full">
                          <div
                            className={cn(
                              "group flex w-full items-center gap-2 rounded-md p-xs text-sidebar-primary hover:bg-sidebar-accent-hover hover:text-sidebar-accent-primary transition-colors",
                              state === "collapsed" && "justify-center",
                            )}
                          >
                            <item.icon className="shrink-0 group-hover/menu-item:text-sidebar-accent-primary" />
                            {state === "expanded" && (
                              <span className="text-base font-normal group-hover/menu-item:text-sidebar-accent-primary">
                                {item.title}
                              </span>
                            )}
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          sideOffset={12}
                          className="w-[280px] p-xs rounded-xl border border-surface-border bg-surface-input flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                        >
                          {/* Header */}
                          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
                            <Folder className="h-[18px] w-[18px] text-sidebar-accent-primary shrink-0" />
                            <span className="text-base font-semibold text-sidebar-primary">
                              Saved Prompts
                            </span>
                          </div>
                          {/* Prompt List */}
                          {SAVED_PROMPTS.map((prompt, i) => (
                            <DropdownMenuItem
                              key={i}
                              className="flex cursor-pointer items-center rounded-lg px-xs py-xs text-sm text-sidebar-primary hover:text-sidebar-accent-primary hover:bg-sidebar-accent-hover focus:bg-sidebar-accent-hover truncate"
                              onClick={() => sendMessage(prompt)}
                            >
                              <span className="truncate">{prompt}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="group p-xs hover:bg-sidebar-accent-hover text-sidebar-primary hover:text-sidebar-accent-primary"
                      tooltip={item.title}
                      render={<a href={item.url} />}
                      onClick={item.onClick ?? undefined}
                    >
                      <item.icon className="text-sidebar-primary group-hover/menu-item:text-sidebar-accent-primary" />
                      <span className="text-base font-normal group-hover/menu-item:text-sidebar-accent-primary">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
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
                      onClick={item.onClick}
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
              className={cn(
                "p-xs flex",
                state === "expanded" && "hover:bg-surface-hover",
              )}
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
