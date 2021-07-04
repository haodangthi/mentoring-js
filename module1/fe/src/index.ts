import './styles.scss'
import io from 'socket.io-client'
import { TaskForToday } from '../../be/src/models'
import { SERVER_URL } from '../../be/src/secret/constants'
import { UserComponent } from './components/user.component'

const user = new UserComponent()
const socketClient = io(`${SERVER_URL}/socket`, {
  query: {
    secret_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwZTFiMmY0MGNhNTU1MmFmNzU2OTM5MCJ9LCJpYXQiOjE2MjU0MDQyOTd9.lE9Rz-I7BTEO11gS4anJLHpVT6Ic7k7Alv1bI-QFsmM',
  },
})

socketClient.on('message', (message: string) => {
  console.log(message)
})

socketClient.on('achievement-status', (message: string) => {
  console.log(message)
})

socketClient.emit('client-message', { data: 'hello from client' })

const startNewChallengeButton = document.getElementById('start-challenge')
const getTaskForTodayButton = document.getElementById('get-today-task')
const completeTaskButton = document.getElementById('complete-task')

startNewChallengeButton.addEventListener('click', startNewChallenge)
socketClient.emit('new-user', 'new user')

function startNewChallenge() {
  user
    .startNewChallenge()
    .then((challengeId) =>
      setClickEventListener(getTaskForTodayButton, getTodayTask(challengeId))
    )
}

function getTodayTask(id: string) {
  return async () => {
    const task = await user.getTodayTask()
    setClickEventListener(completeTaskButton, completeTodayTask(task, id))
  }
}

function completeTodayTask(task: TaskForToday, challengeId: string) {
  return () => {
    console.log('complete')
    socketClient.emit('today-task-completed', {
      task,
      challengeId: challengeId,
    })
  }
}

function setClickEventListener(element: HTMLElement, callback: any) {
  element.addEventListener('click', callback)
}
