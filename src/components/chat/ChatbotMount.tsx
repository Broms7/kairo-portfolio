"use client";

import { usePathname } from "next/navigation";
import { ChatbotWidget } from "./ChatbotWidget";

const HIDDEN_ROUTES = ["/admin-demo"];

export function ChatbotMount() {
  const pathname = usePathname();
  if (!pathname) return null;
  if (HIDDEN_ROUTES.some((p) => pathname.startsWith(p))) return null;
  return <ChatbotWidget />;
}
