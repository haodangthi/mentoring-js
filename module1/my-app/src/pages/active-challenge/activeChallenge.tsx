import React, { useContext, useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect, NavLink, useHistory } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { IChallenge, TaskForToday } from '../../../../be/src/models'
import UserContext from '../../context/UserContext'
import { getChallenge } from '../../services/user.service'
import { Button } from '@material-ui/core'
import { ChallengeResults } from '../challenge-results/challengeResults'
import { ActualAchievements } from './actualAchievementsPage'
import { TodayTaskPage } from './todayTaskPage'
import { ArchiveItems } from './archiveTasksPage'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}))

interface ActiveChallengeProps{
    challengeId?: string;
    token?: string;
}

export default function ActiveChallenge({ challengeId, token }:ActiveChallengeProps) {
    const [ activeChallenge, setActiveChallenge ] = useState<IChallenge>({} as any)
    const [ currentTask, setCurrentTask ] = useState<TaskForToday>({} as any)
    const { socketClient } = useContext(UserContext).socket
    const classes = useStyles()
    
    const completeTodayTask = (task: TaskForToday, challengeId: string) => {
        socketClient.emit('today-task-completed', {
            task,
            challengeId: challengeId,
        })
    }

    useEffect(() => {
        getChallenge(challengeId || '',token || '')
            .then((challenge) => {
                setActiveChallenge(challenge)
                setCurrentTask(challenge.currentTask)
            })
        socketClient.on('completed-task', ({ completedTask }: any) => {
            setCurrentTask(completedTask)
            window.navigator.vibrate(200)
        })
    },[])

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/active-challenge-page" />
                    </Route>
                    <Route path="/active-challenge-page">
                        <ul>
                            <li>
                                <NavLink to="/today-task">{ActiveChallengePages.todayTask}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/achievements">{ActiveChallengePages.achievements}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/archive-tasks">{ActiveChallengePages.archiveTasks}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/completed-challenges">{ActiveChallengePages.completedChallenges}</NavLink>
                            </li>
                        </ul>
                    </Route>
                    <Route path="/today-task">
                        <TodayTaskPage currentTask={currentTask} completeTodayTask={completeTodayTask} challengeId={challengeId} token={token}/>
                    </Route>
                    <Route path="/achievements">
                        <ActualAchievements classes={classes} challengeId={challengeId || ''} token={token|| ''}></ActualAchievements>
                    </Route>
                    <Route path="/archive-tasks">
                        <ArchiveItems classes={classes} challengeId={challengeId || ''} token={token || ''}></ArchiveItems>
                    </Route>
                    <Route path="/completed-challenges">
                        <ChallengeResults token={token || ''}></ChallengeResults>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

enum ActiveChallengePages {
    todayTask = 'Today\'s task',
    achievements = 'Actual achievements',
    archiveTasks = 'Archive Tasks',
    completedChallenges = 'Completed challenges',
}
