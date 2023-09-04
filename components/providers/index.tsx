"use client";
import { SnackbarProvider } from "notistack";
import ThemeRegistry from "../theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </ThemeRegistry>
  );
}
