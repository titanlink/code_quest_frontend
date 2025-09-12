import { MagicCard } from ".";

interface Props {
  children: React.ReactNode
  className?: string
  isActive?: boolean
  withHover?: boolean
}

export const CustomCard = <T,>({children, className, isActive , withHover}: Props) => {

  const hover = withHover ? 'group hover:shadow-lg transition-all duration-300 hover:-translate-y-4' : ''
  return (
    <MagicCard className={`bg-card rounded-xl ${className} ${hover}`}>
      <div className=" text-card-foreground rounded-xl flex flex-col gap-6 py-6 shadow-sm">
        {children}
      </div>
    </MagicCard>
  )
}
