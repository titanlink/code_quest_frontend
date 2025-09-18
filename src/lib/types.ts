export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "user"
  discordId?: string
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  authorId: string
  author: User
  categoryId: string
  category: Category
  tags: string[]
  published: boolean
  featured: boolean
  likesCount: number
  commentsCount: number
  totalView: number
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  content: string
  postId: string
  authorId: string
  author: User
  parentId?: string
  sub_comment?: Comment[]
  createdAt: Date
  updatedAt: Date
}

export interface Like {
  id: string
  postId: string
  userId: string
  createdAt: Date
}

export interface PostFilters {
  category?: string
  search?: string
  featured?: boolean
  published?: boolean
}
