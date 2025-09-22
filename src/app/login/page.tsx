"use client"

import LoginForm from "@/components/login/login-form"
import type React from "react"


export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <LoginForm />
    </div>
  )
}
