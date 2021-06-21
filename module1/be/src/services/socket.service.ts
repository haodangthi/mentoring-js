import { Server, Socket } from 'socket.io'

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
        this.socket = socket
        resolve('connection set')

        this.emit('message', { message: 'hello' })
      })
    })
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data)
  }

  on(eventName: string, callback: any): void {
    this.socket.on(eventName, callback)
  }
}
