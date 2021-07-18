import { SERVER_URL } from '../constants/constants'
import { ActualAchievement, ArchiveItem, IChallenge } from '../../../be/src/models'

const getParams = (token: string) => {
    return {
        method: 'get',
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        })
    }
}

export function getTodayTask(challengeId: string, token: string) {
    return fetch(`${SERVER_URL}/challenges/${challengeId}/task-for-today`, getParams(token))
        .then((response) => response.json())
}

interface IActiveChallenge {
    activeChallenge: string;
}

export function getActiveChallengeId(token: string): Promise<IActiveChallenge> {
    return fetch(`${SERVER_URL}/user/active-challenge`, getParams(token))
        .then((response) => response.json())
}

export function getChallenge(challengeId: string, token: string): Promise<IChallenge> {
    return fetch(`${SERVER_URL}/challenge/${challengeId}`, getParams(token))
        .then((response) => response.json())
}

export function startNewChallenge(token: string) {
    return fetch(`${SERVER_URL}/start-new-challenge`, getParams(token))
        .then((response) => response.json())
}

export function getActualAchievements(challengeId: string, token: string): Promise<ActualAchievement[]> {
    return fetch(`${SERVER_URL}/challenges/${challengeId}/actual-achievements`, getParams(token))
        .then((response) => response.json())
}

export function getTasksArchive(challengeId: string, token: string): Promise<ArchiveItem[]> {
    return fetch(`${SERVER_URL}/challenges/${challengeId}/tasks-archive`, getParams(token))
        .then((response) => response.json())
}


