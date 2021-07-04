import passport from 'passport'
import passportLocal from 'passport-local'
import { User } from '../../schemas/user'
const localStrategy = passportLocal.Strategy
import passportJWT from 'passport-jwt'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.create({ username, password })

        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })

        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JwtStrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)
