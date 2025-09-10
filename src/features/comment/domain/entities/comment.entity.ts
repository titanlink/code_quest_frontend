import { IUser } from "@/features"

export interface IComment {
  id: string
  content: string
  postId: string
  authorId: string
  author: IUser
  parentId?: string
  replies?: IComment[]
  createdAt: Date
  updatedAt: Date
}