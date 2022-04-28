import { User } from 'types/User'
import Database from "./Database"

export default class UserProvider {
  private db: Database

  private table: string = "users"

  constructor () {
    this.db = Database.getInstance()
  }

  public register (username: string, email: string, password: string) {
    // Check if username or email already exists
    const user2 = this.db.getFromTableByField<User>(this.table, "email", email)
    if (user2 !== undefined) throw new Error('An account with this email already exists, try logging in')
    const user = this.db.getFromTableByField<User>(this.table, "username", username)
    if (user !== undefined) throw new Error('Username already taken')

    this.db.insertIntoTable<User>(this.table, [{
      id: this.db.getNextId(this.table),
      username,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      admin: false,
    }])
    return this.db.getFromTableByField<User>(this.table, "username", username)
  }

  public logIn (username: string, password: string): User {
    const user = this.db.getFromTableByField<User>(this.table, "username", username)
    if (user === undefined) throw new Error('User not found')
    if (user.password !== password) throw new Error('Wrong password')
    return user
  }

}