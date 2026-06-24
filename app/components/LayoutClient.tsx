"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import AuthGuard from "./AuthGuard";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
        <AuthGuard>{children}</AuthGuard>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <AuthGuard>{children}</AuthGuard>
      </main>
    </div>
  );
}
