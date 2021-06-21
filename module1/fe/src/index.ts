import './styles.scss'
import io from 'socket.io-client'
import { TaskForToday } from '../../be/src/models'
import { updateTask } from './challenge-methods'

const SERVER_URL = 'http://localhost:3000'
const socketClient = io(`${SERVER_URL}/socket`)

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
  console.log('clicked start')
  fetch(`${SERVER_URL}/start-new-challenge`)
    .then((response) => response.json())
    .then((data) => {
      const challengeId = data.id
      setClickEventListener(getTaskForTodayButton, getTodayTask(challengeId))
    })
}

function getTodayTask(id: string) {
  console.log('getTodayTask')
  return () =>
    fetch(`${SERVER_URL}/challenges/${id}/task-for-today`)
      .then((response) => response.json())
      .then((task: TaskForToday) => {
        setClickEventListener(completeTaskButton, completeTodayTask(task, id))
      })
}

function setClickEventListener(element: HTMLElement, callback: any) {
  element.addEventListener('click', callback)
}

function completeTodayTask(task: TaskForToday, challengeId: string) {
  return () => {
    console.log('complete')
    socketClient.emit('today-task-completed', {
      task: updateTask(task, true),
      challengeId: challengeId,
    })
  }
}
