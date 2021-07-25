import io from 'socket.io-client'
import { SERVER_URL } from '../constants/constants'

class SocketService {
    socketClient: any;

    constructor(token: string) {
        this.initSocketClient(token)
    }

    initSocketClient(token: string) {
        this.socketClient = io(`${SERVER_URL}/socket`, {
            extraHeaders: {
                Authorization: 'Bearer ' + token,
            },
        })

        this.socketClient.on('message', (message: string) => {
            console.log(message)
        })

        this.socketClient.on('achievement-status', (message: string) => {
            console.log(message)
        })

        this.socketClient.on('completed-task', (message: string) => {
            console.log(message)
        })

    }
}

export default SocketService
