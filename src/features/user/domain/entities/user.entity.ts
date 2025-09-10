
export interface IUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "user"
  discordId?: string
  createdAt: Date
}