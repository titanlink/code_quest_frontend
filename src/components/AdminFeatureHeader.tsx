import React, { ReactNode } from 'react'

interface Props {
  title: string;
  subTitle?: string;
  children?:ReactNode
}

export const AdminFeatureHeader = ({title, subTitle, children}:Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        { subTitle && (<p className="text-muted-foreground">{subTitle}</p>)}
      </div>
      {children}
    </div>
  )
}
