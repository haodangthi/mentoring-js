import './styles.scss'
import io from 'socket.io-client'
import { TaskForToday } from '../../be/src/models'
import { UserComponent } from './components/user.component'
import { SERVER_URL, token } from './constants'

const user = new UserComponent()
const socketClient = io(`${SERVER_URL}/socket`, {
  extraHeaders: {
    Authorization: 'Bearer ' + token,
  },
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
    socketClient.emit('today-task-completed', {
      task,
      challengeId: challengeId,
    })
  }
}

function setClickEventListener(element: HTMLElement, callback: any) {
  element.addEventListener('click', callback)
}
