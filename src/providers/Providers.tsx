"use client";

import { Toaster } from "@/components";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "next-themes";
// import { ThemeProvider } from "./theme-provider";
// import { SessionAuthProvider } from "./SessionAuthProvider";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const { theme } = useTheme();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme='dark'
      forcedTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
        {/* <SessionAuthProvider> */}
          {children}
          <Toaster richColors/>
        {/* </SessionAuthProvider> */}
    </ThemeProvider>
  );
};