
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { AuthProvider } from "@/lib/auth-context";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevCaribe Blog - Code Quest 2025",
  description:
    "El blog oficial de DevCaribe para el reto Code Quest 2025 organizado por Fernando Herrera. Aquí compartimos avances, aprendizajes y experiencias de nuestro equipo.",
  keywords: [
    "Code Quest 2025",
    "Fernando Herrera",
    "DevCaribe",
    "reto de programación",
    "Next.js",
    "React",
    "NestJS",
    "Flutter",
    "TypeScript",
    "equipo de desarrollo",
    "hackathon",
    "blog de programación",
    "desarrolladores caribeños",
    "software",
    "frontend",
    "backend"
  ],
  authors: [
    { name: "Equipo DevCaribe", url: "https://code-quest-frontend-blond.vercel.app" },
  ],
  creator: "DevCaribe",
  publisher: "DevCaribe",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "DevCaribe Blog - Code Quest 2025",
    description:
      "Acompáñanos en nuestro recorrido dentro del reto Code Quest 2025 de Fernando Herrera. Publicamos artículos técnicos, proyectos y aprendizajes.",
    url: "https://code-quest-frontend-blond.vercel.app",
    siteName: "DevCaribe Blog",
    images: [
      {
        url: "https://code-quest-frontend-blond.vercel.app/icon.png",
        width: 600,
        height: 600,
        alt: "Logo DevCaribe",
      },
    ],
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevCaribe Blog - Code Quest 2025",
    description:
      "Blog del equipo DevCaribe en el reto Code Quest 2025. Aprendizajes, proyectos y experiencias compartidas.",
    creator: "@devcaribe",
    images: ["https://code-quest-frontend-blond.vercel.app/icon.png"],
  },
  alternates: {
    canonical: "https://code-quest-frontend-blond.vercel.app",
    languages: {
      "es-DO": "https://code-quest-frontend-blond.vercel.app",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
