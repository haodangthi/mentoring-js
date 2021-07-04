import { Server, Socket } from 'socket.io'
import { updateAchievementsAndStatus } from '../functions/database-methods/challenge'
import {
  completeTaskForToday,
  updateTaskForToday,
} from '../functions/database-methods/task-for-today'

export class SocketService {
  io: Server = {} as any
  socket: Socket = {} as any

  constructor(httpServer: any, clientURL: string) {
    this.initSocket(httpServer, clientURL)
  }

  initSocket(httpServer: any, clientURL: string): void {
    // server from node HTTP type ???
    this.io = new Server(httpServer, {
      cors: {
        origin: clientURL,
        methods: [ 'GET', 'POST' ],
      },
    })
  }

  async setConnection() {
    return new Promise((resolve, reject) => {
      this.io.of('/socket').on('connection', (socket) => {
        resolve('connection set')
        socket.emit('message', { message: 'hello' })
        socket.on('today-task-completed', async (data: any) => {
          await updateTaskForToday(data.challengeId, data.task)
          await completeTaskForToday(data.challengeId, data.task)

          updateAchievementsAndStatus(data.challengeId).then((challenge) =>
            socket.emit('achievement-status', {
              message: challenge.achievementsStatus,
            })
          )
        })
      })
    })
  }
}
