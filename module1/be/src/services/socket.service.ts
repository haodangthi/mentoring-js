import { Server, Socket } from 'socket.io'
import { updateAchievementsAndStatus } from '../functions/database-methods/challenge'
import {
  completeTaskForToday,
  updateTaskForToday,
} from '../functions/database-methods/task-for-today'
import { JWT_SECRET } from '../constants/vars'
import passportJWT from 'passport-jwt'
import { verify } from 'jsonwebtoken'
const ExtractJwt = passportJWT.ExtractJwt

export class SocketService {
  io: Server = {} as any
  socket: Socket = {} as any
  options = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: JWT_SECRET
  }

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

  setSocketForTaskCompletion(socket) {
    socket.on('today-task-completed', async (data: any) => {
      const completedTask = await completeTaskForToday(data.challengeId, data.task)

      socket.emit('completed-task', {
        completedTask: completedTask
      })

      updateAchievementsAndStatus(data.challengeId).then((challenge) =>
          socket.emit('achievement-status', {
            message: challenge.achievementsStatus,
          })
      )
    })
  }

  async setConnection() {
    return new Promise((resolve, reject) => {
      this.io.of('/socket').on('connection', (socket) => {
        const token: string = socket.handshake.headers['authorization']?.split(' ')[1] || ''
        if (!token) {
          socket.emit('message', { message: 'No token' })
        } else {
          verify(token, JWT_SECRET,(err) => {
            if (err) {
              return socket.emit('message', { message: 'Invalid token' })
            } else {
              resolve('connection set')
              this.setSocketForTaskCompletion(socket)
              return socket.emit('message', { message: 'Connection set', status: 201 })
            }
          })
        }
      })
    })
  }
}
