import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-[12rem] md:text-[16rem] font-bold text-primary/20 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-primary/10 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Página no encontrada
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-md mx-auto">
                Lo sentimos, la página que buscas no existe o ha sido movida a
                otra ubicación.
              </p>
            </div>

            {/* Decorative Element */}
            <div className="flex justify-center py-4">
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Ir al inicio
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/5 bg-transparent"
              ></Button>
            </div>

            {/* Search Suggestion */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3">
                ¿Buscas algo específico?
              </p>
            </div>
          </div>
        </Card>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>
    </div>
  );
}
