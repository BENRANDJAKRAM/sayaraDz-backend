const Jwtstrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const secretOrKey = process.env.jwt_key
const options = {
  secretOrKey
}
options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken()

module.exports = (Model) => {
  let verify = async (payload, done) => {
    const id = payload.id
    const type = payload.type
    if (type !== Model.type()) { return done(null, false) }
    try {
      let user = await Model.findById(id)
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
  const jwt = new Jwtstrategy(options, verify)
  return jwt
}
