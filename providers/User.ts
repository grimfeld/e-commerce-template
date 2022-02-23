import eventBus from '@root/utils/EventBus'
import { User } from 'types/User'

let users: User[]

if (process.env.NODE_ENV == 'test') {
  users = []
} else if (process.env.NODE_ENV == 'development') {
  users = [
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
} else {
  users = [{
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
  }]
}


export const getUsers = (): User[] => users

export const getUser = (id: number): User => {
  const user = users.find(user => user.id === id)
  if (user === undefined) throw new Error('User not found')
  return user
}

// export const getAuthUser = (id: number, token: string): User | undefined => {
//   const user = users.find(user => user.id === id)
//   if (user === undefined) return undefined
//   if (user?.token !== token) return undefined
//   return user
// }

export const isAdmin = (id: number): boolean => users.find(user => user.id === id)?.admin ?? false

// A function that registers a new user to the list of users
export const register = (username: string, email: string, password: string): User => {
  if (!username || username === '') throw new Error('Username is required')
  if (!email || email === '') throw new Error('Email is required')
  if (!password || password === '') throw new Error('Password is required')
  if (users.find(user => user.username === username)) throw new Error('Username already taken')
  if (users.find(user => user.email === email)) throw new Error('An account with this email already exists')
  const user = {
    id: users.length + 1,
    username,
    email,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
    admin: false
  }
  users.push(user)
  // eventBus.dispatch('user:register', user)
  return user
}

export const logIn = (username: string, password: string): User => {
  if (!username || username === '') throw new Error('Username is required')
  if (!password || password === '') throw new Error('Password is required')
  const user = users.find(user => user.username === username)
  if (!user) throw new Error('User does not exist')
  if (user.password !== password) throw new Error('Password is incorrect')
  return user
}

// export const authenticateUser = (username: string, password: string): User | undefined => {
//   const user = users.find(user => user.username === username && user.password === password)
//   if (user === undefined) return undefined
//   user.token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
//   localStorage.setItem("currentUser", JSON.stringify(user))
//   users.forEach((u) => {
//     if (u.id === user.id) u.token = user.token
//   })
//   eventBus.dispatch("auth-state-changed", user)
//   return user
// }

// export const getCurrentUser = (): User | undefined => JSON.parse(localStorage.getItem("currentUser") as string) ?? undefined

// export const logOut = (): void => {
//   localStorage.removeItem("currentUser")
//   eventBus.dispatch('auth-state-changed', undefined)
// }

export const deleteUser = (id: number): void => {
  users = users.filter(user => user.id !== id)
}
