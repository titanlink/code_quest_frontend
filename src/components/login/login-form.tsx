"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Chrome } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { CustomCard } from "../CustomCard"
import { TextEffect } from "../motion-primitives/text-effect"
import { RainbowButton } from "../ui/rainbow-button"


export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    setLoading(true)
    setError("")

    try {
      await signIn(email, password)
      router.push("/")
    } catch (error) {
      console.log(error);
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      await signInWithGoogle()
      router.push("/")
    } catch (error) {
      console.log(error);
      setError( "Error al iniciar sesión con Google")
    } finally {
      setLoading(false)
    }
  }

  return (
      <CustomCard className="w-100 max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <TextEffect per='word' as='h3' preset='blur' delay={0.5} >Iniciar Sesión</TextEffect>
          </CardTitle>
          <CardDescription className="text-center">
            <TextEffect per='word' as='h3' preset='blur' delay={0.75} >
              Ingresa a tu cuenta para continuar
            </TextEffect>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
            </div>
          </div>
          <RainbowButton
                variant={"outline"}
                size="lg"
                onClick={handleGoogleLogin}
                className="flex flex-row w-full items-center gap-2"
              >
              <Chrome className="mr-2 h-4 w-4" />
              Google
          </RainbowButton>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">¿No tienes una cuenta? </span>
            <Link href="/register" className="text-primary hover:underline">
              Regístrate
            </Link>
          </div>
        </CardContent>
      </CustomCard>
  )
}
