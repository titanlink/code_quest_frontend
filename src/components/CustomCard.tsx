"use client";
import { useState } from "react";
import { ClickSpark } from "./ClickSpark";
import { LoadingPage } from "./LoadingPage";
import { MagicCard } from "./magicui/magic-card";
import { GlowEffect } from "./motion-primitives/glow-effect";


interface Props {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  //isActive?: boolean;
  withHover?: boolean;
  withBlur?: boolean;
  withGlowEffect?: boolean;
  withOpacity?: boolean;
}

export const CustomCard = ({
  children,
  className,
  //isActive,
  withHover,
  isLoading,
  withGlowEffect,
  withBlur,
  withOpacity,
}: Props) => {
  const defaultColors = ["#33FF5730", "#3357FF30", "#F1C40F30"];
  const activeColors = ["#33FF5790", "#3357FF80", "#F1C40F70"];
  const [isHovered, setIsHovered] = useState(false);
  const [colors, setColors] = useState(defaultColors);

  const hover = withHover
    ? "group hover:shadow-lg transition-all duration-300 hover:-translate-y-4"
    : "";
  const blur = withBlur
    ? "transition duration-300 filter blur-xs group-hover:blur-none"
    : "";
  const opacity = withOpacity
    ? isHovered
      ? "opacity-100"
      : `opacity-70`
    : `opacity-100`;
  return (
    <div
      className={`relative cursor-pointer group`}
      onMouseEnter={() => {
        setIsHovered(true);
        setColors(activeColors);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setColors(defaultColors);
      }}
    >
      <MagicCard
        className={`bg-card rounded-xl ${className} ${hover} ${opacity}`}
      >
        {isLoading && <LoadingPage className={"h-full"} label="" detail="" />}
        {!isLoading && (
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            {/* // bg-gradient-to-br from-sky-700/20 to-black/10   */}
            <div
              className={`${blur}
          bg-gradient-to-br from-sky-700/10 to-gray-300/10 
          text-card-foreground 
          rounded-xl 
          flex flex-col gap-6 py-6 shadow-sm`}
            >
              {children}
            </div>
          </ClickSpark>
        )}
      </MagicCard>
      {withGlowEffect && (
        <GlowEffect
          colors={colors}
          mode="pulse"
          blur="medium"
          duration={12}
          scale={0.9}
        />
      )}
    </div>
  );
};
