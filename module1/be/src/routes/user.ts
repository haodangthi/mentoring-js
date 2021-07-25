import express from 'express'
import { updateUser } from '../functions/database-methods/user'
import { getUser } from '../functions/database-methods/user/get-user'
import { getChallengeFromDatabaseById } from '../functions/database-methods/challenge'

const router = express.Router()

router.get('/user/active-challenge', async (req, res) => {
  try {
    const userId = (req as any).user._id
    const user = await getUser(userId)

    res.status(201).json({
      activeChallenge: user.activeChallenge,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/user/completed-challenges', async (req, res) => {
  try {
    const userId = (req as any).user._id
    const user = await getUser(userId)

    res.status(201).json({
      completedChallenges: user.completedChallenges,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.put('/user/:id/update', async (req, res) => {
  try {
    await updateUser(req.params.id, {
      activeChallenge: req.params.id,
    })
    res.status(201).json({ message: 'The user was updated' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export { router as UserRouter }
