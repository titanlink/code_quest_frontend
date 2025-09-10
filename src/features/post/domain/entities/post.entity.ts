import { ICategory, IUser } from "@/features"

export interface IPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  authorId: string
  author: IUser
  categoryId: string
  category: ICategory
  tags: string[]
  published: boolean
  featured: boolean
  likesCount: number
  commentsCount: number
  viewsCount: number
  createdAt: Date
  updatedAt: Date
}