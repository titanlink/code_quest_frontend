import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileX } from "lucide-react"
import { InteractiveGridPattern } from "@/components"
import { cn } from "@/lib"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
          <FileX className="w-12 h-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Artículo no encontrado</h1>
          <p className="text-muted-foreground">El artículo que buscas no existe o ha sido eliminado.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/posts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ver todos los artículos
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
