import { deleteUser, getUser, getUsers, isAdmin, logIn, register } from './User'

let date: Date
let users = getUsers()

beforeAll(() => {
  date = new Date()

  users.push(
    {
      id: 1,
      username: 'test-admin',
      email: 'admin@test.com',
      password: 'test',
      createdAt: date,
      updatedAt: date,
      admin: true
    },
    {
      id: 2,
      username: 'test-user',
      email: 'user@test.com',
      password: 'test',
      createdAt: date,
      updatedAt: date,
      admin: false
    })
})

describe("Getters suite", () => {
  it("returns the list of users", () => {
    expect(getUsers()).toEqual(
      [{
        id: 1,
        username: 'test-admin',
        email: 'admin@test.com',
        password: 'test',
        createdAt: date,
        updatedAt: date,
        admin: true
      },
      {
        id: 2,
        username: 'test-user',
        email: 'user@test.com',
        password: 'test',
        createdAt: date,
        updatedAt: date,
        admin: false
      }
      ])
  })

  it("Fails to return non existent user", () => {
    expect(() => getUser(3)).toThrowError("User not found")
  })

  it("Returns a specific user", () => {
    expect(getUser(1)).toEqual({
      id: 1,
      username: 'test-admin',
      email: 'admin@test.com',
      password: 'test',
      createdAt: date,
      updatedAt: date,
      admin: true
    })
  })

})

describe("Registering suite", () => {

  let id: number
  let otherId: number

  beforeAll(() => {
    const user = register('existingUser', "existing@mail.com", "existingPassword")
    id = user.id
  })
  it("Fails if username is missing", () => {
    expect(() => register("", "test@mail.com", "test")).toThrowError("Username is required")
  })
  it("Fails if email is missing", () => {
    expect(() => register("test", "", "test")).toThrowError("Email is required")
  })
  it("Fails if password is missing", () => {
    expect(() => register("test", "test@mail.com", "")).toThrowError("Password is required")
  })
  it("Fails if username is already taken", () => {
    expect(() => register("existingUser", "newMail@mail.com", "newPassword")).toThrowError("Username already taken")
  })
  it("Fails if email already exists", () => {
    expect(() => register("newUser", "existing@mail.com", "newPassword")).toThrowError("An account with this email already exists")
  })
  it('registers user', () => {
    const user = register('test', 'test@mail.com', 'test')
    otherId = user.id
    expect(user).toEqual(expect.objectContaining({
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      admin: expect.any(Boolean)
    }))
    expect(user).toBeDefined()
  })
  afterAll(() => {
    deleteUser(id)
    deleteUser(otherId)
  })
})

describe("Log in suite", () => {

  beforeAll(() => {
    register('existingUser', 'existingUser@mail.com', 'existingPassword')
  })

  it("Fails if username is missing", () => {
    expect(() => logIn("", "test")).toThrowError("Username is required")
  })
  it("Fails if password is missing", () => {
    expect(() => logIn("test", "")).toThrowError("Password is required")
  })
  it("Fails is user does not exist", () => {
    expect(() => logIn("test", "test")).toThrowError("User does not exist")
  })
  it("Logs the right user in", () => {
    const user = logIn("existingUser", "existingPassword")
    expect(user).toBeDefined()
    expect(user).toEqual(expect.objectContaining({
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      admin: expect.any(Boolean)
    }))
    expect(user.username).toEqual("existingUser")
  })

})

describe("Authorization suites", () => {
  it("Returns false for non admin users", () => {
    expect(isAdmin(2)).toBe(false)
  })
  it("Returns true for admin users", () => {
    expect(isAdmin(1)).toBe(true)
  })
  it('Returns false if user does not exist', () => {
    expect(isAdmin(3)).toBe(false)
  })
})

afterAll(() => {
  users = []
})