"use client";

import { useAuth } from "../firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({
  children,
  allowedRoles = ["admin"],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, loading, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Allow login page (and anything under /login) without auth
  const isLoginPage = pathname.startsWith("/login");

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/login");
    } else if (!loading && user && !allowedRoles.includes(role ?? "") && !isLoginPage) {
      // redirect unauthorized users
      router.replace("/login");
    }
  }, [loading, user, role, allowedRoles, isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!user && !isLoginPage) return null;

  return <>{children}</>;
}
