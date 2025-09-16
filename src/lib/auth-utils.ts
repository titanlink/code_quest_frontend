import { auth } from "./firebase"
import type { User } from "firebase/auth"

export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

export const getAuthToken = async (): Promise<string | null> => {
  const user = getCurrentUser()
  if (!user) return null

  try {
    const token = await user.getIdToken()
    return token
  } catch (error) {
    return null
  }
}

export const refreshAuthToken = async (): Promise<string | null> => {
  const user = getCurrentUser()
  if (!user) return null

  try {
    const token = await user.getIdToken(true) // Force refresh
    return token
  } catch (error) {
    return null
  }
}
