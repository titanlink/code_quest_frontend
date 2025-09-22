
import { X } from 'lucide-react'
import React, { ReactNode } from 'react'
import { ConfirmAlert } from './ConfirmAlert'
import { Button } from './ui/button'

interface Props {
  title?: string
  children?: ReactNode
  actionText?: string
  cancelText?: string
  description?: string
  onDelete: () => void
}

export const ConfirmDelete = ({ 
    children,
    onDelete, 
    title="Eliminar registro",  
    description="Esta acción eliminará el registro permanentemente.",
    actionText="Sí, eliminar",
    cancelText="No, cancelar"
  }: Props) => {
  return (
    <ConfirmAlert
      trigger={
        children ? ( children ) :  ( <Button variant="destructive" size={"icon"} > <X className="h-4 w-4" /> </Button> )
      }
      title={title}
      description={description}
      actionText={actionText}
      cancelText={cancelText}
      onAction={onDelete}
    >

    </ConfirmAlert>
  )
}
