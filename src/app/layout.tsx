import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatProvider } from "@/components/chat-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Command — AI by Rox",
  description:
    "Command is an AI-powered chatbot built for Rox, designed to help teams run account research, weekly briefs, and outreach workflows in seconds.",
  openGraph: {
    title: "Command — AI by Rox",
    description:
      "Command is an AI-powered chatbot built for Rox, designed to help teams run account research, weekly briefs, and outreach workflows in seconds.",
    siteName: "Command",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/og-command.png",
        width: 1200,
        height: 630,
        alt: "Command - AI by Rox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Command — AI by Rox",
    description:
      "Command is an AI-powered chatbot built for Rox, designed to help teams run account research, weekly briefs, and outreach workflows in seconds.",
    images: ["/assets/images/og-command.png"],
  },
  icons: {
    icon: "/assets/logos/rox.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ChatProvider>
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
