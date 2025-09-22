"use client"

import DarkVeil from "@/components/DarkVeil";
import RegisterForm from "@/components/login/register-form";
import { Meteors } from "@/components/ui/meteors";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-700/20 to-accent/10 px-4 relative">
      <Meteors />
      <DarkVeil speed={0.3} hueShift={39} />
      <div className="inset-0 absolute flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  )
}
