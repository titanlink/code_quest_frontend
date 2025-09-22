import React, { ReactNode } from 'react'
import { TextEffect } from './motion-primitives/text-effect';


interface Props {
  title: string;
  subTitle?: string;
  children?:ReactNode
}

export const AdminFeatureHeader = ({title, subTitle, children}:Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <TextEffect per='char' as='h1' preset='blur' className="text-3xl font-bold">{title}</TextEffect>
        { subTitle && (
            <TextEffect per='word' as='h3' preset='blur' delay={0.5} className='text-muted-foreground'>
              {subTitle}
            </TextEffect>
        )}
      </div>
      {children}
    </div>
  )
}
