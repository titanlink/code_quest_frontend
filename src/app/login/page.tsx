"use client"

import LoginForm from "@/components/login/login-form"
import type React from "react"


export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-700/20 to-accent/10 px-4">
      <LoginForm />
    </div>
  )
}
