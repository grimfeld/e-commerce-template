import eventBus from '@root/utils/EventBus'
import { User } from 'types/User'

let users: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@grimfeld.tech',
    password: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    admin: true
  },
  {
    id: 2,
    username: 'user',
    email: 'user@grimfeld.tech',
    password: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    admin: false
  }
]

export const getUsers = (): User[] => users

export const getUser = (id: number): User | undefined => users.find(user => user.id === id)

export const isAdmin = (id: number): boolean => users.find(user => user.id === id)?.admin ?? false

export const logIn = (username: string, password: string): User | undefined => {
  const user = users.find(user => user.username === username && user.password === password)
  if (user === undefined) return undefined
  localStorage.setItem("currentUser", JSON.stringify(user))
  eventBus.dispatch("auth-state-changed", user)
  return user
}

export const getCurrentUser = (): User | undefined => JSON.parse(localStorage.getItem("currentUser") as string) ?? undefined

export const logOut = (): void => {
  localStorage.removeItem("currentUser")
  eventBus.dispatch('auth-state-changed', undefined)
}