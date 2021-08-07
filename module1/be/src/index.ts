import * as dotenv from 'dotenv'

import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import cookieParser from 'cookie-parser'

import { ChallengeRoute } from './routes/start-challenge'
import { AuthRouter } from './routes/auth'

import { SocketService } from './services/socket.service'
import { UserRouter } from './routes/user'
import { User } from './schemas/user'
import { errorHandler } from './routes/middlewares/error-handler'

const localStrategy = passportLocal.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

export const httpServer = createServer(app)

const socketService = new SocketService(
  httpServer,
  [ process.env.CLIENT_URL || '', process.env.MOBILE_URL || '', ]
)

mongoose
  .connect(process.env.MONGO || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))
mongoose.set('useFindAndModify', false)

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

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
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username })

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
      secretOrKey: process.env.JWT_SECRET || 'JWT_SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

app.use(AuthRouter)
app.use(passport.authenticate('jwt', { session: false }), UserRouter)
app.use(ChallengeRoute)

app.use(errorHandler)

socketService.setConnection().then((data) => {
  console.log(data)
})

httpServer.listen(process.env.PORT || '', () => {
  console.log(`App running on port ${process.env.PORT || ''}`)
})
