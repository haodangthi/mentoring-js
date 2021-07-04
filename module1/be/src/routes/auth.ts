import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

const router = express.Router()

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    console.log('request body', req.body, (req as any).user)
    res.json({
      message: 'Signup successful',
      user: (req as any).user,
    })
  }
)

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    console.log('request body', req.body, user)
    try {
      if (err || !user) {
        const error = new Error('An error occurred.')

        return next(error)
      }

      ;(req as any).login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, 'TOP_SECRET')

        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

export { router as AuthRouter }
