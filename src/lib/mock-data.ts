import type { User, Category, Post, Comment } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@blog.com",
    name: "Admin User",
    avatar: "/admin-avatar.png",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "john@example.com",
    name: "John Doe",
    avatar: "/diverse-user-avatars.png",
    role: "user",
    discordId: "john#1234",
    createdAt: new Date("2024-01-15"),
  },
]

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Tecnología",
    slug: "tecnologia",
    description: "Artículos sobre tecnología y desarrollo",
    color: "#0891b2",
  },
  {
    id: "2",
    name: "Diseño",
    slug: "diseno",
    description: "Artículos sobre diseño y UX/UI",
    color: "#7c3aed",
  },
  {
    id: "3",
    name: "Tutoriales",
    slug: "tutoriales",
    description: "Guías paso a paso",
    color: "#059669",
  },
]

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Introducción a Next.js 15",
    slug: "introduccion-nextjs-15",
    content: `# Introducción a Next.js 15

Next.js 15 trae muchas mejoras emocionantes que revolucionarán la forma en que desarrollamos aplicaciones web. En este artículo, exploraremos las características más importantes.

## Nuevas características

### App Router mejorado
El App Router ahora es más rápido y eficiente, con mejor soporte para streaming y suspense.

### Turbopack
El nuevo bundler de Vercel que es hasta 10x más rápido que Webpack.

## Conclusión
Next.js 15 es una actualización increíble que todo desarrollador debería probar.`,
    excerpt: "Descubre las nuevas características de Next.js 15 y cómo pueden mejorar tu desarrollo web.",
    coverImage: "/admin-avatar.png",
    authorId: "1",
    author: mockUsers[0],
    categoryId: "1",
    category: mockCategories[0],
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    featured: true,
    likesCount: 24,
    commentsCount: 8,
    viewsCount: 156,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    title: "Principios de Diseño UX",
    slug: "principios-diseno-ux",
    content: `# Principios de Diseño UX

El diseño de experiencia de usuario es fundamental para crear productos digitales exitosos. Aquí exploramos los principios básicos.

## Los 5 principios fundamentales

1. **Usabilidad**: El producto debe ser fácil de usar
2. **Accesibilidad**: Debe ser accesible para todos los usuarios
3. **Consistencia**: Mantener patrones coherentes
4. **Feedback**: Proporcionar retroalimentación clara
5. **Simplicidad**: Mantener las cosas simples

## Aplicación práctica
Estos principios se pueden aplicar en cualquier proyecto digital.`,
    excerpt: "Aprende los principios fundamentales del diseño UX para crear mejores experiencias digitales.",
    coverImage: "/ux-design-wireframes.png",
    authorId: "1",
    author: mockUsers[0],
    categoryId: "2",
    category: mockCategories[1],
    tags: ["UX", "Design", "User Experience"],
    published: true,
    featured: false,
    likesCount: 18,
    commentsCount: 5,
    viewsCount: 89,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    title: "Cómo configurar TypeScript",
    slug: "como-configurar-typescript",
    content: `# Cómo configurar TypeScript

TypeScript añade tipado estático a JavaScript, mejorando la experiencia de desarrollo y reduciendo errores.

## Instalación

\`\`\`bash
npm install -D typescript @types/node
npx tsc --init
\`\`\`

## Configuración básica
El archivo tsconfig.json es el corazón de la configuración de TypeScript.

## Mejores prácticas
- Usar strict mode
- Configurar paths para imports
- Usar interfaces para definir tipos`,
    excerpt: "Guía completa para configurar TypeScript en tu proyecto desde cero.",
    coverImage: "/diverse-user-avatars.png",
    authorId: "1",
    author: mockUsers[0],
    categoryId: "3",
    category: mockCategories[2],
    tags: ["TypeScript", "JavaScript", "Configuration"],
    published: true,
    featured: false,
    likesCount: 12,
    commentsCount: 3,
    viewsCount: 67,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
]

export const mockComments: Comment[] = [
  {
    id: "1",
    content: "¡Excelente artículo! Me ayudó mucho a entender Next.js 15.",
    postId: "1",
    authorId: "2",
    author: mockUsers[1],
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "2",
    content: "Los principios de UX son fundamentales. Gracias por compartir.",
    postId: "2",
    authorId: "2",
    author: mockUsers[1],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },
]
