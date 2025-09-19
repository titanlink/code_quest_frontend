import { ClickSpark, LoadingPage, MagicCard, Skeleton } from ".";
import { GlowEffect } from "../../components/motion-primitives/glow-effect";

interface Props {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  isActive?: boolean
  withHover?: boolean
  withGlowEffect?: boolean
}

export const CustomCard = <T,>({children, className, isActive , withHover, isLoading, withGlowEffect}: Props) => {

  const hover = withHover ? 'group hover:shadow-lg transition-all duration-300 hover:-translate-y-4' : ''
  return (
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
      {withGlowEffect && (<GlowEffect
        colors={[ '#33FF5720', '#3357FF20', '#F1C40F20']}
        mode='colorShift'
        blur='medium'
        duration={3}
        scale={0.9}
      />)}
    </MagicCard>
  )
}
