"use client";

import { ClickSpark, Toaster } from "@/components";
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
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
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
    </ClickSpark>
  );
};