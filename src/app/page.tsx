import { Navbar } from "@/components/navbar"
import { PostCard } from "@/components/post-card"
import { FeaturedPost } from "@/components/featured-post"
import { mockPosts } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredPosts = mockPosts.filter((post) => post.featured && post.published)
  const regularPosts = mockPosts.filter((post) => !post.featured && post.published)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Descubre el futuro de la
            <span className="text-primary"> tecnología</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
            Artículos, tutoriales y análisis profundos sobre desarrollo web, diseño UX y las últimas tendencias
            tecnológicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#posts">
                Explorar Artículos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/register">Únete a la Comunidad</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{mockPosts.length}+</h3>
              <p className="text-muted-foreground">Artículos Publicados</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">1,200+</h3>
              <p className="text-muted-foreground">Lectores Activos</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">95%</h3>
              <p className="text-muted-foreground">Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Artículos Destacados</h2>
              <Button variant="ghost" asChild>
                <Link href="#all-posts">Ver todos</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section id="posts" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Últimos Artículos</h2>
            <Button variant="outline" asChild>
              <Link href="/posts">Ver todos los posts</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Mantente al día</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Recibe los últimos artículos y tutoriales directamente en tu inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
            />
            <Button>Suscribirse</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">© 2025 DevCaribe</p>
        </div>
      </footer>
    </div>
  )
}
