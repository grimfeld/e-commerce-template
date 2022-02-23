import { getUsers } from '@providers/User'
import handleAuthentication from '@root/pages/api/auth/authenticate'
import httpMocks, { RequestMethod } from 'node-mocks-http'

describe('Authenticate API endpoint test suite', () => {
  let date = new Date()
  let users = getUsers()
  beforeAll(() => {
    users.push(
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
  it.each(['GET', 'PUT', 'DELETE',])("fails if method is %s", (method) => {
    const { req, res } = httpMocks.createMocks({
      method: method as RequestMethod,
    })

    handleAuthentication(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(res._getJSONData()).toEqual({ error: 'Method not allowed' })
  })

  it.each([
    { name: "Username", body: { password: 'test' } },
    { name: "Password", body: { username: "test" } },
  ])('Fails if %s is missing', ({ name, body }) => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body
    })
    handleAuthentication(req, res)
    expect(res._getStatusCode()).toBe(500)
    expect(res._getJSONData()).toEqual({ error: `${name} is required` })
  })

  it("Returns a token for the correct user", () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: { username: 'test-user', password: 'test' }
    })
    handleAuthentication(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ token: expect.any(String) })
  })

  afterAll(() => {
    users = []
  })

})