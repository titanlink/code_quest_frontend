import { ShieldX } from 'lucide-react'
import React from 'react'
import { Ripple } from './magicui/ripple'


export const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="text-center space-y-6">
        <ShieldX className="mx-auto h-24 w-24 text-destructive" />
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Acceso No Autorizado</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">No tienes permisos para acceder a esta página</p>
      </div>
      <Ripple />
    </div>
  )
}
