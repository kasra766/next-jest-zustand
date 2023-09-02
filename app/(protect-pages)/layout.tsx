"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/store/useAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin } = useAuth();
  if (!isLogin) {
    redirect("/login");
  }
  return <div>{children}</div>;
}
