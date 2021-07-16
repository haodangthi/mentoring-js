import express from 'express'
import { updateUser } from '../functions/database-methods/user'
import { getUser } from '../functions/database-methods/user/get-user'

const router = express.Router()

router.get('/user/active-challenge', async (req, res) => {
  const userId = (req as any).user._id
  const user = await getUser(userId)

  res.status(201).json({
    activeChallenge: user.activeChallenge,
  })
})

router.put('/user/:id/update', async (req, res) => {
  await updateUser(req.params.id, {
    activeChallenge: req.params.id,
  })
  res.status(201).json({ message: 'The user was updated' })
})

export { router as UserRouter }
