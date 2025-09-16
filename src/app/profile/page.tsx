"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LogOut, User, Mail, Calendar, Key, Copy, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components"
import { useAuth } from "@/lib"

export default function DashboardPage() {
  const { user, logout, getToken } = useAuth()
  const [token, setToken] = useState<string | null>(null)
  const [tokenCopied, setTokenCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // useEffect(() => {
  //   console.log("🚀 ~ DashboardPage ~ user:", user)
  //   if (!user) {
  //     router.push("/login")
  //   }
  // }, [user, router])

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken()
        setToken(authToken)
      }
    }
    fetchToken()
  }, [user, getToken])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToken = async () => {
    if (token) {
      await navigator.clipboard.writeText(token)
      setTokenCopied(true)
      setTimeout(() => setTokenCopied(false), 2000)
    }
  }

  const refreshToken = async () => {
    const newToken = await getToken()
    setToken(newToken)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bienvenido de vuelta, {user.displayName || "Usuario"}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Usuario
            </CardTitle>
            <CardDescription>Detalles de tu cuenta y perfil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || "Usuario"} />
                <AvatarFallback className="text-lg">
                  {getInitials(user.displayName || user.email || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{user.displayName || "Sin nombre"}</h3>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant={user.emailVerified ? "default" : "secondary"}>
                    {user.emailVerified ? "Email Verificado" : "Email No Verificado"}
                  </Badge>
                  {user.providerData.map((provider:any, index:number) => (
                    <Badge key={index} variant="outline">
                      {provider.providerId === "google.com" ? "Google" : provider.providerId}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Cuenta creada</span>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(user.metadata.creationTime || "")}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Último acceso</span>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(user.metadata.lastSignInTime || "")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Management Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Token de Autenticación
            </CardTitle>
            <CardDescription>Token JWT para usar en tus actions y API calls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {token ? (
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs font-mono break-all text-muted-foreground">{token.substring(0, 50)}...</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyToken} variant="outline" size="sm" className="flex-1 bg-transparent">
                    {tokenCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Token
                      </>
                    )}
                  </Button>
                  <Button onClick={refreshToken} variant="outline" size="sm" className="flex-1 bg-transparent">
                    Actualizar Token
                  </Button>
                </div>
                <Alert>
                  <AlertDescription>
                    Este token se actualiza automáticamente. Úsalo en tus server actions para autenticar las peticiones.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">Cargando token...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
