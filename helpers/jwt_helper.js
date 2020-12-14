const JWT = require('jsonwebtoken')
const config = require('../configs/config')
const resp = require('../common/commonResponse')

module.exports = {
  signAccessToken: (userId) => {
    const payload = { userId }
    const secret = config.ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '1h',
      issuer: 'test.com',
      //audience: userId,
    }
    return JWT.sign(payload, secret, options)
  },

  verifyAccessToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return resp.resType.unAuthorized(res);

    //const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    if (!token) {
      return resp.resType.unAuthorized(res);
    } else {
      JWT.verify(token, config.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return resp.resType.unAuthorized(res);
        }
        req.payload = payload
        //console.log(payload)
        next()
      })
    }
  },

  signRefreshToken: (userId) => {
    const payload = { userId }
    const secret = config.REFRESH_TOKEN_SECRET
    const options = {
      expiresIn: '1y',
      issuer: 'test.com',
      //audience: userId,
    }
    return JWT.sign(payload, secret, options)
  },

  verifyRefreshToken: (req, res, next) => {
    const { refreshToken } = req.body;
    JWT.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return resp.resType.unAuthorized(res);
      }
      req.payload = payload
      //console.log(payload)
      next()
    })
  },
}
