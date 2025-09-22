"use client";

import { ClickSpark } from "@/components/ClickSpark";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        forcedTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* <SessionAuthProvider> */}
        {children}
        <Toaster richColors />
        {/* </SessionAuthProvider> */}
      </ThemeProvider>
    </ClickSpark>
  );
};
