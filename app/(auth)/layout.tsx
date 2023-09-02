"use client";
import { Stack } from "@mui/material";
import { redirect } from "next/navigation";
import { useAuth } from "@/store/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLogin } = useAuth();
  if (isLogin) {
    redirect("/home");
  }
  return (
    <Stack justifyContent="center" alignItems="center" mt={3}>
      {children}
    </Stack>
  );
}
