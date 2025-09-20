import React, { ReactNode } from 'react'
import { TextEffect } from '.';

interface Props {
  title: string;
  subTitle?: string;
  children?:ReactNode
}

export const AdminFeatureHeader = ({title, subTitle, children}:Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          <TextEffect per='char' as='h3' preset='blur'>{title}</TextEffect>
        </h1>
        { subTitle && (
          <p className="text-muted-foreground">
            <TextEffect per='word' as='h3' preset='blur' delay={0.5}>{subTitle}</TextEffect>
          </p>
        )}
      </div>
      {children}
    </div>
  )
}
