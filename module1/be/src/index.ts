import express from 'express'
import { createServer } from 'http'
import cors from 'cors'

import route from './routes/start-challenge'
import { SocketService } from './services/socket.service'
import challengeService from './services/challenges.service'
import { convertMap } from './functions/helpers'
const clientURL = 'http://localhost:8080'

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())

export const httpServer = createServer(app)
const socketService = new SocketService(httpServer, clientURL)

socketService.setConnection().then(() => {
  socketService.io.of('/socket').on('connection', (socket) => {
    socket.on('today-task-completed', (data: any) => {
      const status = challengeService.completeTodayTask(
        data.challengeId,
        data.task
      )

      socket.emit('achievement-status', convertMap(status))
    })
  })
})

app.use(route)
app.get('/', (req, res) => res.send('Hello from server!'))

httpServer.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
