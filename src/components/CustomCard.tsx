'use client'
import { useState } from "react";
import { ClickSpark, GlowEffect, LoadingPage, MagicCard, Skeleton } from ".";

interface Props {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  isActive?: boolean
  withHover?: boolean
  withGlowEffect?: boolean
  
}

export const CustomCard = <T,>({children, className, isActive , withHover, isLoading, withGlowEffect}: Props) => {
  const defaultColors = [ '#33FF5730', '#3357FF30', '#F1C40F30']
  const activeColors = [ '#33FF5790', '#3357FF80', '#F1C40F70']
  const [isHovered, setIsHovered] = useState(false);
  const [colors,setColors] = useState(defaultColors)

  const hover = withHover ? 'group hover:shadow-lg transition-all duration-300 hover:-translate-y-4' : ''
  return (
    <div className="relative"  
      onMouseEnter={() =>{ setIsHovered(true); setColors(activeColors)}}
      onMouseLeave={() =>{ setIsHovered(false); setColors(defaultColors)}}
    >
    <MagicCard className={`bg-card rounded-xl ${className} ${hover}`}>
      { isLoading && (
        <LoadingPage className={'h-full'} label="" detail=""/>
      )}
      { !isLoading && (
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className=" text-card-foreground rounded-xl flex flex-col gap-6 py-6 shadow-sm">
          {children}
        </div> 
      </ClickSpark>
      )}
    </MagicCard>
      {withGlowEffect  && (<GlowEffect
        colors={colors}
        mode='pulse'
        blur='medium'
        duration={12}
        scale={0.9}
      />)}
    </div>
  )
}
