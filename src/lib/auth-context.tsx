"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "./types"
import { mockUsers } from "./mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithDiscord: () => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("blog-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - check against mock users
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("blog-user", JSON.stringify(foundUser))
      setLoading(false)
      return { success: true }
    }

    setLoading(false)
    return { success: false, error: "Credenciales inválidas" }
  }

  const loginWithDiscord = async () => {
    setLoading(true)

    // Simulate Discord OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock successful Discord login
    const discordUser: User = {
      id: "discord-" + Date.now(),
      email: "discord@example.com",
      name: "Usuario Discord",
      avatar: "/diverse-user-avatars.png",
      role: "user",
      discordId: "discord#" + Math.floor(Math.random() * 9999),
      createdAt: new Date(),
    }

    setUser(discordUser)
    localStorage.setItem("blog-user", JSON.stringify(discordUser))
    setLoading(false)
    return { success: true }
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setLoading(false)
      return { success: false, error: "El usuario ya existe" }
    }

    // Create new user
    const newUser: User = {
      id: "user-" + Date.now(),
      email,
      name,
      avatar: "/diverse-user-avatars.png",
      role: "user",
      createdAt: new Date(),
    }

    setUser(newUser)
    localStorage.setItem("blog-user", JSON.stringify(newUser))
    setLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("blog-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithDiscord,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
