import handleRegistration from '@root/pages/api/auth/register'
import httpMocks, { RequestMethod } from 'node-mocks-http'

describe("Register API endpoint test suite", () => {

  it.each(['GET', 'PUT', 'DELETE',])("fails if method is %s", (method) => {
    const { req, res } = httpMocks.createMocks({
      method: method as RequestMethod,
    })

    handleRegistration(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(res._getJSONData()).toEqual({ error: 'Method not allowed' })
  })

  it.each([
    { name: "Username", body: { email: 'test@mail.com', password: 'test' } },
    { name: "Email", body: { username: "test", password: 'test' } },
    { name: "Password", body: { username: "test", email: 'test@mail.com' } },
  ])('Fails if %s is missing', ({ name, body }) => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body
    })
    handleRegistration(req, res)
    expect(res._getStatusCode()).toBe(500)
    expect(res._getJSONData()).toEqual({ error: `${name} is required` })
  })

  // it('Returns a token for the new user', () => {
  //   const { req, res } = httpMocks.createMocks({
  //     method: 'POST',
  //     body: { username: 'new-user', email: 'user@mail.com', password: 'test' }
  //   })
  //   handleRegistration(req, res)
  //   expect(res._getStatusCode()).toBe(200)
  //   expect(res._getJSONData()).toEqual({ token: expect.any(String) })
  // })

})
