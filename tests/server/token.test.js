beforeEach(() => jest.resetModules())

describe('token', () => {
  it('getIssuer returns a token issuer middleware function', done => {
    jest.mock('jsonwebtoken', () => ({
      sign: () => 'test-token'
    }))

    const token = require('../../server/token')

    expect.assertions(3)

    const req = {
      body: {
        username: 'test-user'
      }
    }

    const res = {
      json: ({ token, message }) => {
        expect(token).toBe('test-token')
        expect(message).toBe('Authentication successful.')
        done()
      }
    }

    const getUserByName = username => {
      expect(username).toBe(req.body.username)
      return Promise.resolve({
        id: 1,
        username: username
      })
    }

    token.getIssuer(getUserByName)(req, res)
  })

  it('decode invokes the express-jwt middleware function', () => {
    expect.assertions(4)

    jest.mock('express-jwt', () => {
      return ({ secret }) => {
        expect(typeof secret).toBe('function')

        return (req, res, next) => {
          expect(req).toBe('req')
          expect(res).toBe('res')
          expect(next).toBe('next')
        }
      }
    })

    const token = require('../../server/token')

    token.decode('req', 'res', 'next')
  })

  it('createToken returns a signed token', () => {
    jest.mock('jsonwebtoken', () => ({
      sign: () => 'test-token'
    }))

    const token = require('../../server/token')

    const testToken = token.createToken({}, 'test-secret')

    expect(testToken).toBe('test-token') // from the mock at the top of the file
  })

  it('getTokenDecoder invokes the express-jwt middleware function', () => {
    // TODO: I'm not thrilled with this test. What is it _really_ testing?
    expect.assertions(5)

    jest.mock('express-jwt', () => {
      return ({ secret }) => {
        expect(typeof secret).toBe('function')

        return (req, res, next) => {
          expect(req).toBe('req')
          expect(res).toBe('res')
          expect(next).toBe('next')
        }
      }
    })

    const tokenDecoder = require('../../server/token').getTokenDecoder()
    expect(typeof tokenDecoder).toBe('function')

    tokenDecoder('req', 'res', 'next')
  })
})
