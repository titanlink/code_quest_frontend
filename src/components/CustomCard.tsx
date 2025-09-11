import { MagicCard } from ".";

interface Props {
  children: React.ReactNode
  className?: string
  isActive?: boolean
}

export const CustomCard = <T,>({children, className, isActive}: Props) => {
  return (
    <MagicCard className="bg-card rounded-xl">
      <div className=" text-card-foreground rounded-xl flex flex-col gap-6 py-6 shadow-sm">
        {children}
      </div>
    </MagicCard>
  )
}
